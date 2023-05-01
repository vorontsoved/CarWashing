import { IAuthRepo, Repository } from "../repository/repository.js";
import { AuthService } from "./Auth.js";


export interface IAuthService {
    repository: IAuthRepo,
    signIn: () => void;
    signUp: () => void;
}

export type Services = {
    auth: IAuthService
}

export const createNewServices = (repository: Repository): Services => {
    const newServices: Services = {
        auth: new AuthService(repository.auth)
    }

    return newServices
}