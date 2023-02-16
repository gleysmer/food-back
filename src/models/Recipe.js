const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('recipe', {
        id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true, // debe ser unico
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
        },
        summary: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        healthScore: {
            type: DataTypes.INTEGER,
        },
        steps: {
            type: DataTypes.STRING,
        },
        createdInBd: {
            type: DataTypes.BOOLEAN, // tipo boolean
            allowNull: false,
            defaultValue: true,
        },
    });
};