"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "exercises",
      [
        {
          name: "Multiply",
          cw: "50654ddff44f800200000004",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Largest pair sum in array",
          cw: "556196a6091a7e7f58000018",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Shortest Word",
          cw: "57cebe1dc6fdc20c57000ac9",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Count characters in your string",
          cw: "52efefcbcdf57161d4000091",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Evens times last",
          cw: "5a1a9e5032b8b98477000004",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("exercises", null, {});
  },
};
