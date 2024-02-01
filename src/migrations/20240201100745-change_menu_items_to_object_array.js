

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.addColumn('Orders', 'menu_items', {
          type: Sequelize.DataTypes.ARRAY(Sequelize.JSONB)
        }, { transaction }),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    // This function defines the reverse operation,

    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.removeColumn('Orders', 'menu_items', { transaction }),
      ])
    })

  },
};

