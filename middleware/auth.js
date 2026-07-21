const jwt = require('jsonwebtoken');

const verificarJWT = (req, res, next) => {
  if (process.env.SEGURIDAD_JWT === 'false') {
    return next();
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      error: "Acceso Denegado", 
      detalle: "Se requiere un token JWT válido para acceder a este recurso catastral." 
    });
  }

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verificado; 
    next();
  } catch (err) {
    return res.status(403).json({ 
      error: "Acceso Prohibido", 
      detalle: "El token JWT provisto no es válido o ya ha expirado." 
    });
  }
};

module.exports = verificarJWT;