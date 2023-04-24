const { Router } = require('express');
const { getAllDiet } = require('../controllers/dietController');
const router = Router();
router.get('/diets', async (req, res) => {
    try {
        const diets = await getAllDiet();
        res.status(200).send(diets);
    } catch (error) {
        console.log(error);
    }
    
});
module.exports = router;