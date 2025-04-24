// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { restrictTo } = require('../middlewares/roleMiddleware');
const { check } = require('express-validator');

router.post(
  '/register',
  [
    check('email', 'Por favor incluye un email válido').isEmail().normalizeEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('adminKey', 'Clave de administrador inválida').optional().isString()
  ],
  authController.register
);

router.post(
  '/register-admin',
  protect,
  (req, res, next) => {
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({
        status: 'fail',
        message: 'Solo superadmins pueden registrar administradores'
      });
    }
    next();
  },
  authController.registerAdmin
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