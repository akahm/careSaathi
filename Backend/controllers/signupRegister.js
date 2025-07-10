const { poolPromise, sql } = require("../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer=require("multer")

const upload = multer();

const signupRegister = async (req, res) => {


    const { fullname, contact, state, city, password, email, address } = req.body;
    

  if (!fullname || !contact || !state || !city || !password || !email || !address) {
    return res.status(400).json({ message: "all the fields are required" });
  }

  try {
    const normal_Password = password;
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(normal_Password, saltRounds);

    const pool = await poolPromise;
    const checkUser = await pool
      .request()
      .input("Email",sql.VarChar,email)
      .output("Exists", sql.Bit)
      .execute("sp_emailExists");
    
    // checking if user  already exists

    if (checkUser.output.Exists==1) {
      return res.status(409).json({
        message: "user already exists,sign back into the account",
      });
    }

      // inserting new user into registered db
   try {
  

  // Call InsertUser stored procedure
  const insertUser = await pool
    .request()
    .input("FullName", sql.VarChar, fullname)
    .input("Email", sql.VarChar, email)
    .input("Mobile", sql.VarChar, contact)
    .input("PasswordHash", sql.VarChar, hashedPassword)
    .input("State", sql.VarChar, state)
    .input("City", sql.VarChar, city)
    .input("Address", sql.VarChar, address)
    .input("Status", sql.Bit, true)
    .output("Success", sql.Bit)
    .output("ErrorMessage", sql.NVarChar(sql.MAX))
    .execute("sp_RegisterUser");

  // Call InsertLogin stored procedure
  const insertLogin = await pool
    .request()
    .input("Name", sql.VarChar, fullname)
    .input("Email", sql.VarChar, email)
    .input("PasswordHash", sql.VarChar, hashedPassword)
    .input("Role", sql.VarChar, "user")
    .input("Status", sql.Bit, true)
    .output("Success", sql.Bit)
    .output("ErrorMessage", sql.NVarChar(sql.MAX))
    .execute("sp_LoginUser");

  // this checks both
     if (insertUser.output.Success && insertLogin.output.Success) {
    
       const payload = {
         userId:email, 
        role: "user",
         
       }
      //  this one expires in 24hrs
       const token = jwt.sign(
         payload,
         process.env.JWT_SECRET,
         {
           expiresIn: process.env.JWT_EXPIRE_TIME|| "24h",
           issuer: "caresaathi-website"
         }
       );
       
       const refreshToken = jwt.sign(
         { userId: email, email: email },
         process.env.JWT_SECRET,
         {
           expiresIn:process.env.JWT_REFRESH,issuer:"caresaathi-website"
         }
      )
       
       res.cookie("authToken", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "strict",
         maxAge: 24 * 60 * 60 * 1000,
         path:"/dashboard"
       })

       //  this one is for refresh token
       
      res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000, 
          path: "/dashboard",
        });

       
       return res.status(201).json({ 
          message: "User registered successfully",
          success: true,
          data: {
            user: {
              id: email,
              role: "user"
            }
          }
        });
  } else {
    return res.status(500).json({
      message: "Some error occurred",
      userError: insertUser.output.ErrorMessage,
      loginError: insertLogin.output.ErrorMessage,
    });
  }

} catch (err) {
  console.error("Unhandled DB error:", err);
  return res.status(500).json({
    message: "Internal server error",
    error: err.message,
  });
}

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error in form request" });
  }
};
module.exports = { signupRegister,upload };
