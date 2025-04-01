const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const { promisify } = require('util');
const AppError = require('../utils/appError');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError('El email ya está registrado', 400));
    }

    const newUser = await User.create({ email, password });
    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log('Intento de login para:', email);

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.log('Usuario no existe');
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    console.log('Comparando contraseña...');
    const isMatch = await user.comparePassword(password);
    console.log('Resultado comparación:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
        }
      }
    });
  } catch (err) {
    console.error('Error en login:', err);
    next(err);
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('No estás autorizado para acceder a esta ruta', 401));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(new AppError('El usuario perteneciente a este token ya no existe', 401));
    }

    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    next(err);
  }
};