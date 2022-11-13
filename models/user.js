'use strict';
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        id : {       
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true, 
            allowNull: false
        },
        username : { 
            type: DataTypes.STRING, 
            allowNull: false,
            comment: '아이디'
        }, 
        password : { 
            type: DataTypes.STRING, 
            allowNull: false,
            comment: '비밀번호'
        }, 
        salt : { 
            type: DataTypes.STRING, 
            allowNull: false,
            comment: '솔트'
        }
    }, {
        tableName: 'user', 
    })
    user.associate = function(models){
        user.hasMany(models.feed, { 
            foreignKey: 'user_id',
        })
    }
    return user
}