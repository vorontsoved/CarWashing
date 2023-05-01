import { Dialect, Sequelize } from 'sequelize'

const createSequelizeConnection = (dbName: string, dbUser: string, dbHost: string, dbDriver: Dialect, dbPassword: string): Sequelize => {
    const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
        host: dbHost,
        dialect: dbDriver
    })
    return sequelizeConnection
}

export default createSequelizeConnection