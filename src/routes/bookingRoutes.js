// routes/technicianRoutes.js

const express = require('express');
const router = express.Router();
const bookingController = require('../controller/bookingController');
const inputValidations=require("../Utils/Validation")

// router.get('/health', bookingController.getHealth);
router.post('/createRole',inputValidations.validateCreateRole, bookingController.createRole); // New route for creating a role
router.post('/createTeamEntry', bookingController.createTeamEntry);
router.post('/createPackage', bookingController.createPackage); // New route for creating a package
router.post('/createAddon', bookingController.createAddon);
router.post('/createGarage', bookingController.createGarage);




module.exports = router;
