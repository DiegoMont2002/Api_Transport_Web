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

exports.registerAdmin = async (req, res, next) => {
  try {
    const { email, password, adminKey } = req.body;

    // Validación básica
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({
        status: 'fail',
        message: 'Clave de administrador inválida'
      });
    }

    //Crear usuario con rol admin
    const admin  = await User.create({
      email,
      password,
      role: 'admin'
    });

    // Generar token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      ststus: 'success',
      token,
      user: {
        id: admin._id,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, adminKey } = req.body; // Cambiamos role por adminKey

    // Validación básica
    if (!email || !password) {
      return next(new AppError('Email y contraseña son requeridos', 400));
    }

    // Verificar si el email ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError('El email ya está registrado', 400));
    }

    // Determinar el rol del usuario
    let role = 'user';
    if (adminKey) {
      if (adminKey !== process.env.ADMIN_SECRET_KEY) {
        return next(new AppError('Clave de administrador inválida', 403));
      }
      role = 'admin';
    }

    // Crear el usuario
    const newUser = await User.create({ 
      email, 
      password,
      role
    });

    // Generar token
    const token = signToken(newUser._id);

    // Eliminar datos sensibles de la respuesta
    newUser.password = undefined;

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
    console.log('Request recibida:', req.body);
    const { email, password } = req.body;
    
    // 1. Validar usuario
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // 2. Validar contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // 3. Generar token (¡usa la variable correcta!)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 4. Limpia el token antes de enviarlo
    const cleanToken = token.replace(/\s/g, '');

    res.status(200).json({
      status: "success",
      token: cleanToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

    /*if (cleanToken.includes(' ')) {
      console.error('Token generado con espacios', token);
      throw new Error('Error al generar toeken');
    }

    res.status(200).json({
      status: "success",
      token: cleanToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });

  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};*/

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