// controllers/healthController.js

const healthController = {
    getHealth: (req, res) => {
      res.json({ status: 'ok', message: 'API is healthy' });
    },
  };
  
  module.exports = healthController;
  