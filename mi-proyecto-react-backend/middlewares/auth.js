const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Proteger rutas - usuario debe estar autenticado
exports.protect = async (req, res, next) => {
  try {
    let token;
    
    // 1) Obtener el token del header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ message: 'No estás autorizado para acceder a esta ruta' });
    }
    
    // 2) Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3) Verificar si el usuario aún existe
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ message: 'El usuario perteneciente a este token ya no existe' });
    }
    
    // 4) Guardar usuario en la request
    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Por favor inicia sesión para acceder' });
  }
};

// Restringir a ciertos roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }
    next();
  };
};