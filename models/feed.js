'use strict'
module.exports = (sequelize, DataTypes) => {
    const feed = sequelize.define('feed', {
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
        comment: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'feed', 
    })
    feed.associate = function(models){
        feed.belongsTo(models.user, { 
            foreignKey: 'user_id',
        })
    }
    return feed
}