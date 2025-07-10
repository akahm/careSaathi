const express = require("express");
const app = express();
const cookieParser=require("cookie-parser")
const contactRoutes = require("./routes/contact.routes");
const cors = require("cors");
const userRoutes = require("./routes/registerlogin.routes.js");
const adminRoutes = require("./routes/adminlogin.routes");

//  middleware first
app.use(cookieParser());
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api", contactRoutes); 
// user routes
app.use("/api", userRoutes);

app.use("/api", adminRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});