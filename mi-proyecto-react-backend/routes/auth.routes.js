// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { check } = require('express-validator');

router.post(
  '/register',
  [
    check('email', 'Por favor incluye un email válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 })
  ],
  authController.register
);

router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Emial inválido'),
    check('password').exists().withMessage('La contraseña es requerida'),
  ],
  authController.login
);

router.get('/me', authController.protect, authController.getMe);

module.exports = router;