'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    const data = require('../data/categories.json').map((e) =>{
      e.createdAt = e.updatedAt = new Date()
      return e
    })
    // console.log(data);
    
    await queryInterface.bulkInsert('Categories', data );
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Categories', null, {
      truncate:true,
      restartIdentity:true
    });
  }
};
