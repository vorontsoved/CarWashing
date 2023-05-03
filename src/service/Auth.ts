import { Sequelize } from "sequelize";
import { IAuthRepo, Repository } from "../repository/repository.js";
import { IAuthService } from "./service.js";

export class AuthService implements IAuthService {
    repository: IAuthRepo
    constructor(repository: IAuthRepo) {
        this.repository = repository
    }

    signIn = (login: string, password: string): object => {
        console.log('Запуск функции авторизации')

        return {

        }
    }

    check = (login: string, password: string): object => {
        console.log('Запуск функции проверки пользователя')

        return {

        }
    }
    signUp = () => { console.log() }

}