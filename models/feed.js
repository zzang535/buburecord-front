'use strict';
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
            allowNull: false, // required
        },   
        comment: {
            type: DataTypes.STRING,
            allowNull: false, // required
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false, // required
        }       
    }, {
        tableName: 'feed', 
    });
    return feed;
};