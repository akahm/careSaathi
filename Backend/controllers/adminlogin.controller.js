const pool = require('../config/db'); // PostgreSQL pool
const jwt = require("jsonwebtoken");

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await pool.connect();

    // 1. Call the procedure
    await client.query("CALL dbo.sp_admin_login_check($1, $2)", [email, password]);

    // 2. Select the result from temp table
    const result = await client.query("SELECT * FROM dbo.temp_login_result");

    client.release();

    if (result.rows.length === 1) {
      const user = result.rows[0];

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        user
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
