import { Model } from 'sequelize'
import { IDB } from './postgres.js'
import { IAuthRepo } from './repository.js'

export class AuthPostgres implements IAuthRepo {
  db: IDB
  constructor(db: IDB) {
    this.db = db
  }
  //db.user.create()

  signUp = (login: string, hash: string, salt: string) => {
    return this.db.sequelize.models.User.create({
      login: login,
      password_hash: hash,
      salt: salt,
    })
  }

  findOne = (login: string): Promise<Model | null> => {
    return this.db.sequelize.models.User.findOne({
      where: {
        login: login,
      },
    })
  }

  findOneToken = (userId: number) => {
    return this.db.sequelize.models.Token.findOne({
      where: {
        user_id: userId,
      },
    })
  }
  createRefresh = (userId: number, refreshToken: string) => {
    return this.db.sequelize.models.Token.create({
      user_id: userId,
      refresh_token: refreshToken,
    })
  }
  updateRefresh = (userId: number, refreshToken: string) => {
    return this.db.sequelize.models.Token.update(
      {
        refresh_token: refreshToken,
      },
      {
        where: {
          user_id: userId,
        },
      }
    )
  }
  removeToken = (refreshToken: string) => {
    return this.db.sequelize.models.Token.destroy({
      where: {
        refresh_token: refreshToken
      }
    })
  }
  findToken = (refreshToken: string) => {
    return this.db.sequelize.models.Token.findOne({
      where: {
        refresh_token: refreshToken
      }
    })
  }
  getAllUsers = () => {
    return this.db.sequelize.models.Token.findAll()
  }
}
