'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    const data = require('../data/orders.json').map((e) =>{
      delete e.id, e.createdAt = e.updatedAt = new Date()
      return e
    })
    // console.log(data);
    
    await queryInterface.bulkInsert('Orders', data );
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Orders', null, {
      truncate:true,
      restartIdentity:true
    });
  }
};
