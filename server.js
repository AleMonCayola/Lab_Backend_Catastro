const express = require('express');
require('dotenv').config();

const apiRoutes = require('./routes/api');

const app = express();
app.use(express.json());

app.use('/catastro/api/v1', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[CATASTRO BACKEND] Servidor iniciado con éxito en el puerto ${PORT}`);
  console.log(`[SEGURIDAD JWT] Estado: ${process.env.SEGURIDAD_JWT === 'true' ? 'ACTIVADO' : 'DESACTIVADO'}`);
});