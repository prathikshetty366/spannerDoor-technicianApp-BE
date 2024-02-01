const express = require('express');
const { PrismaClient } = require('@prisma/client');
const technicianRoutes = require('./src/routes/bookingRoutes');


const app = express();
const prisma = new PrismaClient();
app.use(express.json()); // Add this line to parse JSON requests

app.use('/v1/technician', technicianRoutes);

// Attempt to connect to the database
prisma.$connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Exit the process if database connection fails
  });


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
