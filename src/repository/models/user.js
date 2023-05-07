import { Model } from 'sequelize'

const UserModel = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Token, { foreignKey: 'user_id' });
      // define association here
    }
  }
  User.init({
    login: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

export default UserModel