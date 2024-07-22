const { User } = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sequelize } = require('../models');

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update(req.body);
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
  try {
      const user = await User.findByPk(req.params.id);
      if (user) {
          await user.destroy();
          res.status(204).json();
      } else {
          res.status(404).json({ error: 'User not found' });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    console.log(`Signing in user with email: ${email}`);

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '1h' });

    return res.json({ success: true, token, id: user.id });
  } catch (error) {
    console.error('Error during signin:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.signup = async (req, res, next) => {
  const { email, firstName, lastName, password } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser.id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '1h' });
    return res.json({ success: true, token, id: newUser.id });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

  