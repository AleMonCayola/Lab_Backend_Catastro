const pool = require('../db');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { login, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE login = $1 AND password = $2', [login, password]);
    
    if (result.rows.length > 0) {
      const user = result.rows[0];
      
      const token = jwt.sign(
        { id: user.id, nombres: user.nombres, login: user.login, tipoUsuario: user.tipousuario },
        process.env.JWT_SECRET,
        { expiresIn: '2h' } 
      );

      res.json({
        mensaje: "Autenticación exitosa",
        token: token
      });
    } else {
      res.status(401).json({ error: "Credenciales incorrectas" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};