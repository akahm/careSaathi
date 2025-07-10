const jwt = require("jsonwebtoken");
const { poolPromise, sql } = require("../config/db");

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("Email", sql.VarChar, email)
      .input("Password", sql.VarChar, password)
      .execute("Sp_AdminLogin"); 

    if (result.recordset.length === 1) {
      const user = result.recordset[0];

      const token = jwt.sign(
        {
          id: user.Id,
          email: user.Email,
          role: user.Role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN || "1h"
        }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.Id,
          name: user.Name,
          email: user.Email,
          role: user.Role
        }
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
