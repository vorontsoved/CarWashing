import { Sequelize } from 'sequelize'
import { genSaltSync, hashSync } from 'bcrypt-ts'
import jwt from 'jsonwebtoken'

import { IAuthRepo, Repository } from '../repository/repository.js'
import { IAuthService } from './service.js'
import { IResp } from './service.js'
import { ApiError } from '../exceptions/api-error.js'

import UserDto from '../dtos/userDto.js'
import TokenDto from '../dtos/tokenDto.js'

export class AuthService implements IAuthService {
  saltLength = 10
  repository: IAuthRepo
  constructor(repository: IAuthRepo) {
    this.repository = repository
  }

  generateToken = async (payload: UserDto) => {
    const accessToken = jwt.sign(payload.toJSON(), process.env.JWT_ACCESS_SECRET as jwt.Secret, { expiresIn: '2d' });
    const refreshToken = jwt.sign(payload.toJSON(), process.env.JWT_REFRESH_SECRET as jwt.Secret, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };

  };



  saveToken = async (userId: number, refreshToken: string) => {
    const tokenData = await this.repository.findOneToken(userId)
    if (tokenData) {
      const ref = await this.repository.updateRefresh(userId, refreshToken)
      console.log('refreshTokenWheHeIs', ref)
      return
    }
    const t = await this.repository.createRefresh(userId, refreshToken)
    const token = new TokenDto(t)
    return token


  }

  signUp = async (login: string, password_hash: string): Promise<IResp> => {
    const results = await this.repository.findOne(login)
    if (results !== null) {
      throw ApiError.BadRequest('Такой логин уже занят')
    }
    const salt = genSaltSync(this.saltLength)
    const hash = hashSync(password_hash, salt)
    const createUser = await this.repository.signUp(login, hash, salt)
    const User = new UserDto(createUser)
    const tokens = await this.generateToken(User)
    const saveToken = await this.saveToken(User.id, tokens.refreshToken)


    return { data: { "id": User.id, "login": User.login, "refresh_token": saveToken?.refreshToken, "access_token": tokens?.accessToken } }
  }

  signIn = async (login: string, password_hash: string): Promise<IResp> => {


    return {
      data: { "id": 21 }
    }
  }
  check = async (login: string): Promise<IResp> => {
    return { data: '62626626' }
  }
}