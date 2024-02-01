// routes/technicianRoutes.js

const express = require('express');
const router = express.Router();
const bookingController = require('../controller/bookingController');
const inputValidations=require("../Utils/Validation")

// router.get('/health', bookingController.getHealth);
router.post('/createRole',inputValidations.validateCreateRole, bookingController.createRole); 
router.post('/createTeamEntry', bookingController.createTeamEntry);
router.post('/createPackage', bookingController.createPackage);
router.post('/createAddon', bookingController.createAddon);
router.post('/createGarage', bookingController.createGarage);
router.post("/createCustomer",bookingController.createCustomer);
router.post('/createVehicle', bookingController.createVehicle); // New route for creating a vehicle
router.post('/createBooking',bookingController.createBooking)
router.get('/getCustomerDetails', bookingController.getCustomerDetails);
router.get('/getVehicleDetails', bookingController.getVehicleByRegistration);


module.exports = router;
