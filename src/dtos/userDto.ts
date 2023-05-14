import { Model } from 'sequelize'

interface JsonSerializable {
  toJwtToken(): object;
}

export default class UserDto implements JsonSerializable {
  id: number;
  login: string;
  password: string;


  constructor(model: Model | null) {
    this.id = model?.get('id') as number;
    this.login = model?.get('login') as string;
    this.password = model?.get('password_hash') as string
  }

  toJwtToken(): object {
    return {
      id: this.id,
      login: this.login
    };
  }
}
