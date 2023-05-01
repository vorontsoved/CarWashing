import { Dialect, Sequelize, DataTypes } from 'sequelize'
import fs from 'fs'
import path from 'path'

const createSequelizeConnection = async (dbName: string, dbUser: string, dbHost: string, dbDriver: Dialect, dbPassword: string) => {

    const db: any = {};

    const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
        host: dbHost,
        dialect: dbDriver
    })

    const files = fs.readdirSync(path.resolve("./src/repository/models"))
    for (const i in files) {
        const model = (await import('./models/' + files[i]))(sequelize, DataTypes);
        db[model.name] = model;
    }

    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    return db
}

export default createSequelizeConnection
