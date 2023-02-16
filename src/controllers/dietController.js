const axios = require('axios');
const {  Diet } = require('../db');
const { APIKEY1, APIKEY2, APIKEY3, APIKEY4 } = process.env;

const getAllDiet = async () => {

    const dietApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY1}&addRecipeInformation=true&number=10`);
    let diets = await dietApi.data.results.map((e) => e.diets);
    
    let types = diets.flat();
    
    let typeDiet = [
        ...new Set(types),
        'vegetarian',
        'lacto vegetarian',
        'ovo vegatarian',
    ];
    
    typeDiet.forEach(async (e) => {
        await Diet.findOrCreate({
            where: { name: e },
        });
    });
    const allDiets = await Diet.findAll();
    // console.log('dietas en database');
    return allDiets;


// const dietsTotal = [ 'vegetarian','lacto vegetarian','ovo vegetarian','low FODMAP','gluten free','dairy free','lacto ovo vegetarian','vegan','paleolithic','primal','whole 30','pescatarian','ketogenic','fodmap friendly']
//     dietsTotal.forEach(e => {
//         Diet.findOrCreate({
//             where: {name : e.toLowerCase()}
//         })
//     })
//     return dietsTotal

    // const dataExist = await Diet.findAll();
    // if (dataExist.length===0){
    //     const dietApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY1}&addRecipeInformation=true&number=100`);    
    //     const diets = dietApi.data?.results.map((el) => el.diets); 
    //     const dietsConcat = diets.flat().concat("vegetarian", "vegan", "glutenFree"); 
    //     const allDiet = [...new Set(dietsConcat)]; 

    //     for (let diet in allDiet) {
    //         Diet.findOrCreate({
    //             where: { name : allDiet[diet] }
    //         })
    //     };
    // }
}
module.exports = { getAllDiet };