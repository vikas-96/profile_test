module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("users", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lock_password: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue:
            "$2y$12$hOKynMeIYqPFFfytaBhpOeGRC/ZGbFYgu3ikK2CXfYZwNjY/MNszO",
        },
        age: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        gender: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        contact: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
        createdAt: { type: Sequelize.DATE },
      })
      .then(() => {
        queryInterface.sequelize.query(
          "CREATE SEQUENCE IF NOT EXISTS users_account_no_seq START 100001 MINVALUE 100001 MAXVALUE 999999 CYCLE"
        );
      });
  },

  down: (queryInterface, Sequelize) => queryInterface.dropTable("users"),
};
