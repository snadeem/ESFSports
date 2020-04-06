'use strict';

/*import fs  from 'fs';
import path  from 'path';
import Sequelize  from 'sequelize';*/

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
//const env = process.env.NODE_ENV || 'development';
const env = process.env.NODE_ENV || 'development';
//const config = require(__dirname + '/config.json')[env];
const config = "{
    'development': {
      'username': 'BVfbobVG1G',
    'password': 'LmdZr3W4Pa',
    'database': 'BVfbobVG1G',
    'host': 'remotemysql.com',
      'dialect': 'mysql',
      'pool': {
        'max': 5,
        'min': 0,
        'acquire': 30000,
        'idle': 10000
      }
    },
    'test': {
      'username': 'root',
      'password': null,
      'database': 'test_db_name',
      'host': '127.0.0.1',
      'dialect': 'mysql'
    },
  'production': {
    'username': 'root',
    'password': '',
    'database': 'production_db_name',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  }
  }";
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//export default db;
module.exports = db;
