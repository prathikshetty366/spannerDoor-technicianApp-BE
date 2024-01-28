// routes/technicianRoutes.js

const express = require('express');
const router = express.Router();
const healthController = require('../controller/bookingController');

router.get('/health', healthController.getHealth);

module.exports = router;
