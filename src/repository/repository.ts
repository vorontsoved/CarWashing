import { Sequelize } from "sequelize"
import { AuthPostgres } from "./auth_postgres.js";
import { IDB } from "./postgres.js";

export interface IAuthRepo {
    db: IDB,
    signIn: () => void;
    signUp: () => void;
}

export type Repository = {
    auth: IAuthRepo
}

export const createNewRepository = (db: IDB): Repository => {
    const newRepo: Repository = {
        auth: new AuthPostgres(db)
    }

    return newRepo
}