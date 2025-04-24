const restrictTo = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError('No tienes permiso para realizar esta acción', 403)
        );
      }
      next();
    };
  };
  
  module.exports = { restrictTo };