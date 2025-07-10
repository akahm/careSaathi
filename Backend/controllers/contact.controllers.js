const { poolPromise, sql } = require("../config/db");

exports.submitContactForm = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, service, message } = req.body;

    if (!firstName || !email || !message) {
      return res.status(400).json({ error: "First Name, Email, and Message are required" });
    }

    const pool = await poolPromise;

    const result = await pool.request()
      .input("FirstName", sql.VarChar(50), firstName)
      .input("LastName", sql.VarChar(50), lastName || null)
      .input("Email", sql.VarChar(100), email)
      .input("Phone", sql.VarChar(20), phone || null)
      .input("Subject", sql.VarChar(100), service || null)
      .input("Message", sql.VarChar(sql.MAX), message)
      .input("Action", sql.VarChar(100), "InsertMessageContact")
      .execute("Sp_manageContact");

    const status = result.recordset[0].Status;

    if (status === 1) 
    {
      res.status(201).json({ message: "Contact form submitted successfully!" });
    } 
    else {
      res.status(409).json({ message: "This email is already registered." });
    }

  } catch (err) {
    console.error("Error inserting contact:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
