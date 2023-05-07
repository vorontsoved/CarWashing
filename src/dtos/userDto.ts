import { Model } from 'sequelize'

interface JsonSerializable {
  toJSON(): object;
}

export default class UserDto implements JsonSerializable {
  id: number;
  login: string;

  constructor(model: Model | null) {
    this.id = model?.get('id') as number;
    this.login = model?.get('login') as string;
  }

  toJSON(): object {
    return {
      id: this.id,
      login: this.login,
    };
  }
}
