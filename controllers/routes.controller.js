const Route = require('../models/Route');
const cloudinary = require('../config/cloudinary');

// Obtener todas las rutas
exports.getAllRoutes = async (req, res, next) => {
  try {
    const routes = await Route.find({ active: true });
    res.status(200).json({
      status: 'success',
      results: routes.length,
      data: {
        routes
      }
    });
  } catch (err) {
    next(err);
  }
};

// Obtener una ruta específica
exports.getRoute = async (req, res, next) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      return res.status(404).json({ message: 'Ruta no encontrada' });
    }
    res.status(200).json({
      status: 'success',
      data: {
        route
      }
    });
  } catch (err) {
    next(err);
  }
};

// Buscar rutas
exports.searchRoutes = async (req, res, next) => {
  try {
    const { from, to, date } = req.query;
    
    let query = { active: true };
    if (from) query.from = new RegExp(from, 'i');
    if (to) query.to = new RegExp(to, 'i');
    
    const routes = await Route.find(query);
    
    res.status(200).json({
      status: 'success',
      results: routes.length,
      data: {
        routes
      }
    });
  } catch (err) {
    next(err);
  }
};

// Crear una nueva ruta (Admin)
exports.createRoute = async (req, res, next) => {
  try {
    // Subir imagen a Cloudinary si existe
    let featuredImage = {};
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'ruta-maya/routes'
      });
      featuredImage = {
        public_id: result.public_id,
        url: result.secure_url
      };
    }

    const newRoute = await Route.create({
      ...req.body,
      featuredImage
    });

    res.status(201).json({
      status: 'success',
      data: {
        route: newRoute
      }
    });
  } catch (err) {
    next(err);
  }
};