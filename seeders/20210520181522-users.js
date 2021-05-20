"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Dave",
          email: "dave@gmail.com",
          password: "test12345",
          codewars_username: "davemolk",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lucas",
          email: "lucas@gmail.com",
          password: "test12345",
          codewars_username: "jhoffner",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
