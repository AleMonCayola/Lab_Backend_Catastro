const express = require('express');
const router = express.Router();


const verificarJWT = require('../middleware/auth');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const predioController = require('../controllers/predioController');


router.post('/login', authController.login);
router.get('/usuarios', verificarJWT, userController.obtenerUsuarios);
router.get('/predios', verificarJWT, predioController.obtenerPredios);
router.get('/predios/:id', verificarJWT, predioController.obtenerPredioPorId);

module.exports = router;