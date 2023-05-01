import { Sequelize } from "sequelize";
import { IAuthRepo } from "./repository.js";

export class AuthPostgres implements IAuthRepo {
    db: Sequelize;
    constructor(db:Sequelize){
        this.db = db
    }
    signIn = () => {}
    signUp = () => {}
}
