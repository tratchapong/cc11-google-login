module.exports = (sequelize, DataTypes) => {
  const GoogleUser = sequelize.define(
    'GoogleUser',
    {
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      }
    },
    {
      underscored: true
    }
  );

  return GoogleUser;
};
