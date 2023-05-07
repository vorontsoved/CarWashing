import { Model } from 'sequelize'

export default class TokenDto {
  accessToken: string
  refreshToken: string
  constructor(model: Model | null) {
    this.accessToken = model?.get('access_token') as string
    this.refreshToken = model?.get('refresh_token') as string
  }
}
