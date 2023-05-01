// import { Model, DataTypes } from 'sequelize';
// // import { createSequelizeConnection } from './database';

// const sequelize = createSequelizeConnection();

// class User extends Model {
//   public id!: number;
//   public name!: string;
//   public email!: string;
//   public password!: string;
//   public age!: number | null;
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;
// }

// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.STRING(50),
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//       unique: true,
//     },
//     password: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     age: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       allowNull: true,
//     },
//   },
//   {
//     tableName: 'users',
//     sequelize,
//   }
// );

// export default User;
