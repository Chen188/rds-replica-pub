const Sequelize = require('sequelize');

const sequelize = new Sequelize('rds-test', null, null, {
    dialect: 'mysql',
    port: 3306,
    replication: {
      read: [
        { host: 'localhost', username: 'root', password: 'root' },
      ],
      write: { host: 'localhost', username: 'root', password: 'root' }
    },
    pool: { // If you want to override the options used for the read/write pool you can do so here
      max: 20,
      idle: 30000
    },
  })

module.exports = sequelize;