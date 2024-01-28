// controllers/healthController.js
const prisma =require("../prismClient/prismaClient")

const { v4: uuidv4 } = require('uuid'); // Import the v4 function from uuid

async function createRole(req, res) {
  try {
    const { name } = req.body;

    // Check if the role with the given name already exists
    const existingRole = await prisma.role.findFirst({
      where: { name },
    });

    if (existingRole) {
      return res.status(409).json({ error: 'Role with this name already exists.' });
    }

    // Generate a new UUID
    const roleId = uuidv4();

    // Insert the role into the database
    const newRole = await prisma.role.create({
      data: {
        id: roleId,
        name,
      },
    });

    res.status(201).json(newRole);
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

  async function createTeamEntry(req, res) {
    try {
      const { name, contactNumber, roleId, dob, rewardPoints } = req.body;
      const teamId = uuidv4();
  
      const newTeamEntry = await prisma.team.create({
        data: {
          id: teamId,
          name,
          contactNumber,
          roleId,
          dob,
          rewardPoints,
        },
      });
  
      res.status(201).json(newTeamEntry);
    } catch (error) {
      console.error('Error creating team entry:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async function createPackage(req, res) {
    try {
      const { name, price } = req.body;
  
      // Generate a new UUID
      const packageId = uuidv4();
  
      // Insert the package into the database
      const newPackage = await prisma.package.create({
        data: {
          id: packageId,
          name,
          price,
        },
      });
  
      res.status(201).json(newPackage);
    } catch (error) {
      console.error('Error creating package:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async function createAddon(req, res) {
    try {
      const { name, price } = req.body;
  
      // Generate a new UUID
      const addonId = uuidv4();
  
      // Insert the addon into the database
      const newAddon = await prisma.addons.create({
        data: {
          id: addonId,
          name,
          price,
        },
      });
  
      res.status(201).json(newAddon);
    } catch (error) {
      console.error('Error creating addon:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async function createGarage(req, res) {
    try {
      const { name, location, pincode, incharge } = req.body;
  
      // Generate a new UUID for the id field
      const id = uuidv4();
  
      // Insert the garage into the database
      const newGarage = await prisma.garage.create({
        data: {
          id,
          name,
          location,
          pincode,
          incharge,
        },
      });
  
      res.status(201).json(newGarage);
    } catch (error) {
      console.error('Error creating garage:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  
  
  module.exports = {
    createRole,
    createTeamEntry,
    createPackage,
    createAddon,
    createGarage
  };  