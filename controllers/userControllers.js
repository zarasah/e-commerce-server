const { User } = require('../models');
const registerSchena = require('../validation/registerSchema');

async function register(req, res) {
    const {error} = registerSchena.validate(req.body)

    console.log(error)
    if(!error) {
        const { firstname, lastname, email, password } = req.body;
    await User.create({
        firstname,
        lastname,
        email,
        password
    })
        res.status(201).json({ message: 'User created' });
    } else {
        res.status(400).json(error.details);
    }
}

module.exports = {
    register
}