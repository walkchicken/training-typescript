import { BaseModel } from '../../base-model';
import { api } from '../../constants/constant';
import { get } from '../../helpers/service';

export class OrderModel extends BaseModel {
  constructor() {
    super(`${api.PATH_ORDER}`);
  }

  async getAllProduct<T>(): Promise<T[]> {
    const response = await get<T[]>({ url: `${api.PATH_PRODUCT}` });

    return response;
  }
}
