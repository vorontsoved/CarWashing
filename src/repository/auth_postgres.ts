import { Sequelize } from "sequelize";
import { IAuthRepo } from "./repository.js";

export class AuthPostgres implements IAuthRepo {
    db: Sequelize;
    constructor(db: Sequelize) {
        this.db = db
    }
    //db.user.create()
    signIn = () => { console.log }
    signUp = () => { console.log }
    findOne = () => this.db.user.findOne({

    })
    // findOne = (login: string) => (
    //     {
    //         where: {
    //             login: login
    //         }
    //     })
}
