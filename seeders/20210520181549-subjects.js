"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "subjects",
      [
        {
          name: "arrays",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "strings",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "clever",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "notation",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("subjects", null, {});
  },
};
