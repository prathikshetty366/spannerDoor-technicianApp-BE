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
  async function createCustomer(req, res) {
    try {
      const { name, email, phoneNumber, licence, pincode, gst, address, notifications } = req.body;
  
      // Check if the customer with the given phone number already exists
      const existingCustomer = await prisma.customer.findFirst({
        where: { phoneNumber },
      });
  
      if (existingCustomer) {
        return res.status(409).json({ error: 'Customer with this phone number already exists.', errorCreating: true });
      }
  
      // Generate a new UUID for the id field
      const id = uuidv4();
  
      // Insert the customer into the database
      const newCustomer = await prisma.customer.create({
        data: {
          id,
          name,
          email,
          phoneNumber,
          licence,
          pincode,
          gst,
          address,
          notifications,
        },
      });
  
      res.status(201).json(newCustomer);
    } catch (error) {
      console.error('Error creating customer:', error);
      res.status(500).json({ error: 'Internal Server Error', errorCreating: true });
    }
  }
  
async function getCustomerDetails(req, res) {
  try {
    const { phoneNumber } = req.query;

    let customerDetails;


    if (phoneNumber) {
      // Fetch customer details based on partial name or phone number
      customerDetails = await prisma.customer.findMany({
        where: {
          OR: [
            { phoneNumber: { contains: phoneNumber } },
            { name: { contains: phoneNumber } },
          ],
        },
        include: {
          vehicles: true,
          bookings: true,
          customerVoice: true,
        },
      });
    } else {
      return res.status(400).json({ error: 'Please provide searchTerm in the query parameters' });
    }

    if (!customerDetails || customerDetails.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.status(200).json(customerDetails);
  } catch (error) {
    console.error('Error fetching customer details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateCustomerDetails(req, res) {
  try {
    const customerId = req.query.id;
    const updatedFields = req.body; // Fields to be updated sent by the client

    // Check if the customer exists
    const existingCustomer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!existingCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Check if the provided phone number already exists for a different user
    const differentUserExist = await prisma.customer.findFirst({
      where: {
        phoneNumber: updatedFields.phoneNumber,
        id: { not: customerId }, // Exclude the current customer from the search
      },
    });

    if (differentUserExist) {
      return res.status(400).json({ error: 'Number you\'re trying to update already exists for a different user', userExist: true });
    }

    // Update only the fields sent by the client
    const updatedCustomer = await prisma.customer.update({
      where: {
        id: customerId,
      },
      data: {
        ...existingCustomer,
        ...updatedFields,
        updated_at: new Date(),
      },
      include: {
        vehicles: true,
        bookings: true,
        customerVoice: true,
      },
    });

    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error('Error updating customer details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function createVehicle(req, res) {
  try {
    const { customerId, registration, model, last_service_date, next_service_date, insurance_expiry_date, emission_expiry_date, odo_reading } = req.body;

    // Check if a vehicle with the same registration already exists
    const existingVehicle = await prisma.vehicle.findFirst({
      where: {
        registration,
      },
    });

    if (existingVehicle) {
      return res.status(400).json({ error: 'Vehicle with this registration already exists' });
    }

    // Generate a new UUID for the vehicle id
    const vehicleId = uuidv4();

    // Insert the vehicle into the database
    const newVehicle = await prisma.vehicle.create({
      data: {
        id: vehicleId,
        customerId,
        registration,
        model,
        last_service_date,
        next_service_date,
        insurance_expiry_date,
        emission_expiry_date,
        odo_reading,
      },
    });

    res.status(201).json(newVehicle);
  } catch (error) {
    console.error('Error creating vehicle:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getVehicleByRegistration(req, res) {
  try {
    const { registration } = req.query;

    // Find the vehicle by registration number
    const vehicle = await prisma.vehicle.findFirst({
      where: {
        registration,
      },
    });

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    console.error('Error fetching vehicle details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
  
async function createBooking(req, res) {
  try {
    const {
      garageId,
      customerId,
      addonIds,
      packageId,
      vehicleId,
      technician_id,
      start_time,
      end_time,
      technician_feedback,
    } = req.body;

    // Check if Garage with given ID exists
    const garageExists = await prisma.garage.findUnique({
      where: { id: garageId },
    });
    if (!garageExists) {
      return res.status(404).json({ error: 'Garage not found' });
    }

    // Check if Customer with given ID exists
    const customerExists = await prisma.customer.findUnique({
      where: { id: customerId },
    });
    if (!customerExists) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Check if Addons with given IDs exist
    const addonsExist = await prisma.addons.findMany({
      where: { id: { in: addonIds } },
    });
    if (!addonsExist.length) {
      return res.status(404).json({ error: 'One or more addons not found' });
    }

    // Check if Package with given ID exists
    const packageExists = await prisma.package.findUnique({
      where: { id: packageId },
    });
    if (!packageExists) {
      return res.status(404).json({ error: 'Package not found' });
    }

    // Check if Vehicle with given ID exists
    const vehicleExists = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });
    if (!vehicleExists) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Check if Technician with given ID exists
    const technicianExists = await prisma.team.findUnique({
      where: { id: technician_id },
    });
    if (!technicianExists) {
      return res.status(404).json({ error: 'Technician not found' });
    }

    // Generate a new UUID for the booking
    const bookingId = uuidv4();

    // Insert the booking into the database
    const newBooking = await prisma.serviceBookings.create({
      data: {
        id: bookingId,
        garageId: garageId,
        customerId: customerId,
        addonId: { connect: addonIds.map((addonId) => ({ id: addonId })) },
        packageId: packageId,
        vehicleId: vehicleId,
        technicianId: technician_id,
        start_time: start_time,
        end_time: end_time,
        technician_feedback: technician_feedback,
        service_status: 1,
        checklist_status: 0,
        garageBookings: {
          connect: {
            id: garageId,
          },
        },
        CustomerInfo: {
          connect: {
            id: customerId,
          },
        },
        packageInfo: {
          connect: {
            id: packageId,
          },
        },
        vehicleInfo: {
          connect: {
            id: vehicleId,
          },
        },
        technicianInfo: {
          connect: {
            id: technician_id,
          },
        },
      },
    });
    

    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
  
  module.exports = {
    createRole,
    createTeamEntry,
    createPackage,
    createAddon,
    createGarage,
    createCustomer,
    getCustomerDetails,
    createVehicle,
    getVehicleByRegistration,
    createBooking,
    updateCustomerDetails
  };  