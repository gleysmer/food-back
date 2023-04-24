const { Router } = require('express');
const { Recipe, Diet } = require('../db');
const { getAllInf } = require('../controllers/recipeController');

const router = Router();

router.get('/recipes', async (req, res) => {
    try {
        let { name } = req.query;
        let all = await getAllInf();

        if (name) {
            
            let result = all.filter((e) =>
                e.name.toLowerCase().includes(name.toLowerCase())
            );
            result.length
                ? res.status(200).send(result)
                : res.status(404).send('nombre no encontrado');
        } else {
            
            return res.status(200).send(all);
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/recipes/:id', async (req, res) => {
    try {
        let { id } = req.params;
       
        const all = await getAllInf();
        if (id) {
            const result = all.filter((e) => e.id == id);
            
            result.length
                ? res.status(200).send(result)
                : res.status(404).send('id no existe');
        } else {
            return res.status(404).send('id no existe');
        }
    } catch (error) {
        console.log(error);
    }
});

router.post('/recipes', async (req, res) => {
    try {
        const {
            name,
            image,
            summary,
            healthScore,
            steps,
            diets,
        } = req.body;
        
        const diet = await Diet.findAll({
            where: {
                name: diets,
            },
        });
        // console.log(diet);
        const newRecipe = await Recipe.create({
            name,
            image,
            summary,
            healthScore,
            steps,
        });
        // console.log(newRecipe);
        await newRecipe.addDiet(diet);
        res.status(200).send('recipe creado con exito');
    } catch (error) {
        console.log('Fallo la creacion');
    }
});

module.exports = router;