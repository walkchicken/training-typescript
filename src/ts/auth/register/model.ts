import { api } from '../../constants/constant';
import { BaseModel } from '../../base-model';

export class RegisterModel extends BaseModel {
  constructor() {
    super(`${api.PATH_USER}`);
  }
}
