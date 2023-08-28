'use strict'
module.exports = (sequelize, DataTypes) => {
    const note = sequelize.define('note', {
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
        title_korean: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        title_japanese: {
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
        tableName: 'note', 
    })
    note.associate = function(models){
        note.belongsTo(models.user, { 
            foreignKey: 'user_id',
        })
    }
    return note
}