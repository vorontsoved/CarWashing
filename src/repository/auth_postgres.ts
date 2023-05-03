import { IDB } from "./postgres.js";
import { IAuthRepo } from "./repository.js";

export class AuthPostgres implements IAuthRepo {
    db: IDB;
    constructor(db: IDB) {
        this.db = db
    }
    //db.user.create()
    signIn = () => { console.log }
    signUp = () => { console.log }
    findOne = (login: string) => this.db.sequelize.afterBulkDestroy.

    // findOne = (login: string) => (
    //     {
    //         where: {
    //             login: login
    //         }
    //     })
}
