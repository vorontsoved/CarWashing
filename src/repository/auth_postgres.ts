import { Sequelize } from "sequelize";
import { IAuthRepo } from "./repository.js";


class AuthPg extends IAuthRepo {
    constructor(db: Sequelize) {
        super();
        this.db = db, 
    }
    signIn = (db: Sequelize): void => {
        console.log()
    }

    signUp(db: Sequelize): void {
        console.log()
    }
}



export const newAuth = (db: Sequelize): IAuthRepo => {
    const newAuthPg: IAuthRepo = {
        signIn: () => signIn(db),
        signUp: () => signUp(db)
    }
    return newAuthPg
}