import { IAuthRepo, Repository } from '../repository/repository.js'
import { AuthService } from './Auth.js'


export interface IResp {
  data: any
}

export interface IAuthService {
  repository: IAuthRepo

  signUp: (login: string, password_hash: string) => Promise<IResp>
  signIn: (login: string, password_hash: string) => Promise<IResp>
  check: (login: string) => Promise<IResp>
  //   signUp: () => void
}

export type Services = {
  auth: IAuthService
}

export const createNewServices = (repository: Repository): Services => {
  const newServices: Services = {
    auth: new AuthService(repository.auth),
  }

  return newServices
}
