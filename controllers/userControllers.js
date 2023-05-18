const { User } = require('../models');
const registerSchema = require('../validation/registerSchema');
const loginSchema = require('../validation/loginSchema');
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../utils/generateAccessToken');

async function register(req, res) {
    const { error } = registerSchema.validate(req.body);

    if (error) {
        res.status(400).json(error.details);
        return;
    }

    const { firstname, lastname, email, password } = req.body;

    try {
        const emailExists = await User.findOne({
            where: {
              email
            }
        })

        if (emailExists) {
            return res.status(409).json({ error: 'Email already exists' });
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword
        })

        return res.status(201).json({ message: 'User registered successfully' });
    } catch(error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

function login(req, res) {
    const { error } = loginSchema.validate(req.body);

    if (error) {
        return res.status(400).json(error.details);
    }

    const { email, password } = req.body;

    User.findOne({ where: { email } })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        bcrypt.compare(password, user.password)
        .then((isPasswordValid) => {
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
        
            const token = generateAccessToken(user.id, user.email, user.role);
            return res.status(200).json({ message: 'Login successful', jwt: token, role: user.role, name: user.name });
        });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
}

module.exports = {
    register,
    login
}