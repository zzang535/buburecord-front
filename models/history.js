'use strict'
module.exports = (sequelize, DataTypes) => {
    const history = sequelize.define('history', {
        id : {       
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true, 
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false, 
        },   
        content_korean: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        content_japanese: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
    }, {
        tableName: 'history', 
    })
    history.associate = function(models){
        history.belongsTo(models.user, { 
            foreignKey: 'user_id',
        })
    }
    return history
}