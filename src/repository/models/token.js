'use strict';
import { Model } from 'sequelize'

const TokenModel = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Token.belongsTo(models.User, { foreignKey: 'user_id' });
      // define association here
    }
  }
  Token.init({
    user_id: DataTypes.INTEGER,
    refresh_token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};

export default TokenModel