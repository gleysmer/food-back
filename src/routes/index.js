const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const recipeRouter= require('./recipeRouter');
const dietRouter= require('./dietRouter')
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', recipeRouter)
router.use('/', dietRouter)

module.exports = router;
