import { IAuthRepo } from "../repository/repository.js";
import { IAuthService } from "./service.js";



const signIn = (authRepo: IAuthRepo): void => {
    console.log()
}

const signUp = (authRepo: IAuthRepo): void => {
    console.log()
}

export const newAuth = (authRepo: IAuthRepo): IAuthService => {
    const newAuth: IAuthService = {
        signIn: () => signIn(authRepo),
        signUp: () => signUp(authRepo)
    }
    return newAuth
}