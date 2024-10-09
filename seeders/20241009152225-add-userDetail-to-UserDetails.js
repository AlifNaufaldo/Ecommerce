'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    const data = require('../data/userProfiles.json').map((e) =>{
      delete e.id, e.createdAt = e.updatedAt = new Date()
      return e
    })
    // console.log(data);
    
    await queryInterface.bulkInsert('UserDetails', data );
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('UserDetails', null, {
      truncate:true,
      restartIdentity:true
    });
  }
};
