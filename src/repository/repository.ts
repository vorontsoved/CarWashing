import { Sequelize } from "sequelize"
import { AuthPostgres } from "./auth_postgres.js";


export interface IAuthRepo {
    db: Sequelize,
    signIn: () => void;
    signUp: () => void;
}

export type Repository = {
    auth: IAuthRepo
}

export const createNewRepository = (db: Sequelize): Repository => {
    const newRepo: Repository = {
        auth: new AuthPostgres(db)
    }

    return newRepo
}