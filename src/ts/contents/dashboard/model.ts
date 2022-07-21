import { api } from '../../constants/constant';
import { BaseModel } from '../../base-model';

export class ProductModel extends BaseModel {
  constructor() {
    super(`${api.PATH_PRODUCT}`);
  }
}
