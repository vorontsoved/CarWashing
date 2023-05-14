import { Sequelize } from 'sequelize'
import { genSaltSync, hashSync, compare } from 'bcrypt-ts'
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

  static validateAccessToken(token: string): any {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET as jwt.Secret)
      return userData;
    } catch (error) {
      return null
    }
  }

  validateRefreshToken(token: string): any {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET as jwt.Secret)
      return userData;
    } catch (error) {
      return null
    }
  }

  generateToken = async (payload: UserDto ): Promise<any> => {
    const accessToken = jwt.sign(payload.toJwtToken(), process.env.JWT_ACCESS_SECRET as jwt.Secret, { expiresIn: '2d' });
    const refreshToken = jwt.sign(payload.toJwtToken(), process.env.JWT_REFRESH_SECRET as jwt.Secret, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };

  };



  saveToken = async (userId: number, refreshToken: string): Promise<any | TokenDto> => {
    const tokenData = await this.repository.findOneToken(userId)
    if (tokenData) {
      const ref = await this.repository.updateRefresh(userId, refreshToken)
      if (!ref) {
        throw ApiError.BadRequest('Ошибка авторизации, refresh_token не обновился')
      }
      return { 'refreshToken': refreshToken }
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
    const salt: string = genSaltSync(this.saltLength)
    const hash: string = hashSync(password_hash, salt)
    const createUser = await this.repository.signUp(login, hash, salt)
    const User = new UserDto(createUser)
    const tokens = await this.generateToken(User)
    const saveToken = await this.saveToken(User.id, tokens.refreshToken)


    return { data: { "id": User.id, "login": User.login, "refresh_token": saveToken?.refreshToken, "access_token": tokens?.accessToken } }
  }

  signIn = async (login: string, password_hash: string): Promise<IResp> => {
    const results = await this.repository.findOne(login)
    if (results === null) {
      throw ApiError.BadRequest('Вы не зарегестрированы')
    }
    const User = new UserDto(results)
    const isPassEquals = await compare(password_hash, User.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Пароль неверный')
    }
    const tokens = await this.generateToken(User);
    const saveToken = await this.saveToken(User.id, tokens.refreshToken)
    return {
      data: {
        "id": User.id, "login": User.login, "refresh_token": saveToken?.refreshToken, "access_token": tokens?.accessToken
      }
    }
  }




  signOut = async (refresh_token: string): Promise<number> => {
    const token = this.repository.removeToken(refresh_token)
    console.log(token)
    return token
  }

  refresh = async (refresh_token: string): Promise<any> => {
    if (!refresh_token) {
      throw ApiError.UnauthorizedError()
    }
    const userData = this.validateRefreshToken(refresh_token);
    const tokenFromDb = await this.repository.findToken(refresh_token)
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }
    const modelUser = await this.repository.findOne(userData.login) //ХЗ
    const User = new UserDto(modelUser)
    const tokens = await this.generateToken(User);
    const saveToken = await this.saveToken(User.id, tokens.refreshToken)
    return {
      data: {
        "id": User.id, "login": User.login, "refresh_token": saveToken?.refreshToken, "access_token": tokens?.accessToken
      }
    }
  }

  getUsers = async (): Promise<any> => {
    const users = this.repository.getAllUsers()
    return users
  }
}