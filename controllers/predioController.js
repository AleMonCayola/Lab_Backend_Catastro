const pool = require('../db');

exports.obtenerPredios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM predios');
    
    const dataFormatted = result.rows.map(predio => ({
      type: "predio",
      id: predio.id,
      attributes: {
        codigoSubdistrito: predio.codigosubdistrito,
        codigomanzana: predio.codigomanzana,
        codigopredio: predio.codigopredio,
        direccion: predio.direccion,
        estado: predio.estado,
        usuarioId: predio.usuario_id
      }
    }));

    const respuesta = { data: dataFormatted };
    if (req.usuario) {
      respuesta.auditoria = { consultadoPor: req.usuario.nombres };
    }

    res.json(respuesta);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener datos de predios" });
  }
};

exports.obtenerPredioPorId = async (req, res) => {
  const { id } = req.params;
  
  try {
    if (process.env.SEGURIDAD_JWT === 'false') {
      const result = await pool.query('SELECT * FROM predios WHERE id = $1', [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Predio no encontrado" });
      }
      
      return res.json({
        alerta: "MODO VULNERABLE ACTIVO",
        data: result.rows[0]
      });
    }

    const usuarioIdEnToken = req.usuario.id; 

    const result = await pool.query(
      'SELECT * FROM predios WHERE id = $1 AND usuario_id = $2', 
      [id, usuarioIdEnToken]
    );

    if (result.rows.length > 0) {
      res.json({
        mensaje: "Acceso autorizado al registro del predio",
        auditoria: { consultadoPor: req.usuario.nombres },
        data: {
          type: "predio",
          id: result.rows[0].id,
          attributes: {
            codigoSubdistrito: result.rows[0].codigosubdistrito,
            codigomanzana: result.rows[0].codigomanzana,
            codigopredio: result.rows[0].codigopredio,
            direccion: result.rows[0].direccion,
            estado: result.rows[0].estado
          }
        }
      });
    } else {
      res.status(403).json({ 
        error: "Acceso Prohibido", 
        detalle: `El usuario no cuenta con privilegios para este recurso.` 
      });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al consultar el predio específico" });
  }
};