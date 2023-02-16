const axios= require('axios');
const { Recipe, Diet }= require('../db');

    const { APIKEY1, APIKEY2, APIKEY3, APIKEY4 }=     process.env


    const getApiInfo = async () => {
            try {
                let diet = await axios.get(
                    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY1}&addRecipeInformation=true&number=10`
                );
        
                let all = diet.data.results.map((e) => {
                    return {
                        id: e.id,
                        image: e.image,
                        name: e.title.toLowerCase(),
                        diets: e.diets.map((e) => {
                            return { name: e };
                        }),
                        summary: e.summary,
                        healthScore: e.healthScore,
                        dishTypes: e.dishTypes,
                        steps: e.analyzedInstructions[0]?.steps.map((e) => {
                            return {
                                number: e.number,
                                step: e.step,
                            };
                        }),
                    };
                });
        
            return all;

            } catch (error) {
                console.log(error);
            }
        };

    const getDbInf= async()=>{
    const infoDb= await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
    return infoDb
}


const getAllInf = async () => {
    try {
        const api = await getApiInfo();
        const dataBase = await getDbInf();
        const all = api.concat(dataBase);
        // console.log(all.length);
        return all;
    } catch (error) {
        console.log('Tuvimos un error');
    }
};

module.exports= {
    // getApiInfo,
    getAllInf,

};