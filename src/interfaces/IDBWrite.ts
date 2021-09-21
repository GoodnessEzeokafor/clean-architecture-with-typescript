import { DeleteResult } from 'mongodb';

export interface IDBWrite<T> {
  create(item: T): Promise<boolean>;
  update(field: T, item: any): Promise<any>;
  delete(id: T): Promise<DeleteResult>;
}
