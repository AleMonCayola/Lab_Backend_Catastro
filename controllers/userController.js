const pool = require('../db');

exports.obtenerUsuarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, nombres, apellidos, "tipousuario", login, estado FROM usuarios');
    
    const dataFormatted = result.rows.map(user => ({
      type: "user",
      id: user.id,
      attributes: {
        nombres: user.nombres,
        apellidos: user.apellidos,
        tipoUsuario: user.tipousuario,
        login: user.login,
        estado: user.estado
      }
    }));

    const respuesta = { data: dataFormatted };
    
    if (req.usuario) {
      respuesta.auditoria = { consultadoPor: req.usuario.nombres };
    }

    res.json(respuesta);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener usuarios catastrales" });
  }
};