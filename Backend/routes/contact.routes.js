const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controllers");
const { getStates, getCities } = require("../controllers/stateCitycontroller");

router.post("/contact", contactController.submitContactForm);
router.get("/states", getStates);
router.get("/cities", getCities);
module.exports = router;
