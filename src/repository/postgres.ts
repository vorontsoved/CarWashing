import { Dialect, Sequelize, DataTypes, Model } from 'sequelize'
import fs from 'fs'
import path from 'path'


interface IExModel extends Model {
    associate: (models: IModels) => void
}

interface IModels {
    [name: string]: IExModel
}

export interface IDB {
    models: IModels,
    sequelize: Sequelize,
}

export const createSequelizeConnection = async (dbName: string, dbUser: string, dbHost: string, dbDriver: Dialect, dbPassword: string) => {



    const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
        host: dbHost,
        dialect: dbDriver
    })
    const db: IDB = { models: {}, sequelize: sequelize }

    const files = fs.readdirSync(path.resolve('./src/repository/models'))
    for (const i in files) {
        const model = (await import('./models/' + files[i])).default(
            sequelize,
            DataTypes
        )
        db.models[model.name] = model
    }

    Object.keys(db).forEach(modelName => {
        if (db.models[modelName] && db.models[modelName].hasOwnProperty('associate')) {
            db.models[modelName].associate(db.models)
        }
    })

    db.sequelize = sequelize
    return db
}


