import { Sequelize } from "sequelize";
import { IAuthRepo, Repository } from "../repository/repository.js";
import { IAuthService } from "./service.js";

export class AuthService implements IAuthService {
    repository: IAuthRepo
    constructor(repository: IAuthRepo){
        this.repository = repository
    }
    signIn = () => {console.log()}
    signUp = () => {console.log()}
    
}