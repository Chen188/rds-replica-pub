const Sequelize = require('sequelize');
const sequelize = require('../db');
const Model = Sequelize.Model;

class Book extends Model { }
Book.init({
    title: Sequelize.STRING,
    desc: Sequelize.TEXT,
}, { sequelize, modelName: 'book' });

module.exports = Book