import { Sequelize } from "sequelize"
import { newAuth } from "./auth_postgres.js";


export interface IAuthRepo {
    db: Sequelize,
    signIn: () => void;
    signUp: () => void;
}







export interface Repository {
    auth: IAuthRepo
}


export const createNewRepository = (db: Sequelize): Repository => {
    const newRepo: Repository = {
        auth: newAuth(db)
    }

    return newRepo
}