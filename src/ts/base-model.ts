import { api } from './constants/constant';
import { get, create, update, remove } from './helpers/service';
import { User } from './interface/user';
import { Response } from './interface/handle-error';

export class BaseModel {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async getOne<T>(id: number): Promise<T> {
    const response = await get<T>({ url: this.url, id: id });

    return response;
  }

  async getAll<T>(): Promise<T[]> {
    const response = await get<T[]>({ url: this.url });

    return response;
  }

  async update<T>(id: number, data: T): Promise<Response<T>> {
    return this.handleResponse<T>(() => update<T>({ url: this.url, id: id }, data));
  }

  async create<T>(data: T): Promise<Response<T>> {
    return this.handleResponse<T>(() => create<T>({ url: this.url }, data));
  }

  async delete<T>(id: number): Promise<Response<T>> {
    return this.handleResponse<T>(() => remove<T>({ url: this.url, id: id }));
  }

  async handleResponse<T>(fetchData: { (): Promise<T> }): Promise<Response<T>> {
    try {
      const result = await fetchData();

      return { status: 200, data: result };
    } catch (error) {
      return { status: 400, message: `Error + ${error}` };
    }
  }
}
