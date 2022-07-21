import { get } from '../../helpers/service';
import { User } from '../../interface/user';
import { RegisterModel } from '../register';

export class LoginModel extends RegisterModel {
  constructor() {
    super();
  }

  async checkLogin<T>(username: string, password: string): Promise<T> {
    const response = await get<T>({
      url: this.url,
      filter: `username=${username}&pass=${password}`,
    });

    return response;
  }
}
