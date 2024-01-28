// utils/validation.js
function validateCreateRole(req, res, next) {
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.length === 0 || !/^[A-Za-z0-9-]+$/.test(name)) {
        return res.status(400).json({ error: 'Invalid or missing name in the request body. Name should include only alphanumeric characters and hyphens.' });
    }
    next(); // Continue to the next middleware if validation passes
}


module.exports = {
    validateCreateRole,
    // Add exports for other validation functions
};
