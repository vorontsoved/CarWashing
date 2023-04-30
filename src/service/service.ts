import { Repository } from "../repository/repository.js";
import { newAuth } from "./Auth.js";


export interface IAuthService {
    signIn: () => void;
    signUp: () => void;
}







export interface Services {
    auth: IAuthService
}

export const createNewServices = (repository: Repository): Services => {
    const newServices: Services = {
        auth: newAuth(repository.auth)
    }

    return newServices
}