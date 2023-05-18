const jwt = require("jsonwebtoken");
require('dotenv').config();
const SECRET = process.env.SECRET;

function generateAccessToken(id, email, role) {
    const payload = {
        id,
        email,
        role
    };
    return jwt.sign(payload, SECRET, { expiresIn: "36000s" });
}

module.exports = { generateAccessToken }