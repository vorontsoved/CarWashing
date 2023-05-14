import { Sequelize, Model } from 'sequelize'
import { AuthPostgres } from './auth_postgres.js'
import { IDB } from './postgres.js'
import { IResp } from '../service/service.js'

export interface IAuthRepo {
  db: IDB
  signUp: (login: string, hash: string, salt: string) => Promise<Model | null>
  createRefresh: (userId: number, refreshToken: string) => Promise<Model | null>
  updateRefresh: (userId: number, refreshToken: string) => Promise<[affectedCount: number]>
  removeToken: (refreshToken: string) => Promise<number>
  findToken: (refreshToken: string) => Promise<Model | null>
  findOneToken: (UserId: number) => Promise<Model | null>
  findOne: (login: string) => Promise<Model | null>
  getAllUsers: () =>  Promise<Model<any, any>[]>
}

export type Repository = {
  auth: IAuthRepo
}

export const createNewRepository = (db: IDB): Repository => {
  const newRepo: Repository = {
    auth: new AuthPostgres(db),
  }

  return newRepo
}
