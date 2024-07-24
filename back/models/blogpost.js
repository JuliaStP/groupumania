'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlogPost extends Model {
    static associate(models) {
    }
  }
  BlogPost.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    author: DataTypes.STRING,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BlogPost',
  });
  return BlogPost;
};