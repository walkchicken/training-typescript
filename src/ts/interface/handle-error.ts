import { User } from './user';

export interface Response<T> {
  status: number;
  message?: string;
  data?: T;
}

export interface ValidateError {
  isValidate: boolean;
  message: string;
}
