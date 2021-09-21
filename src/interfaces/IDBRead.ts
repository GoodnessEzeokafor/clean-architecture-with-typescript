import { Filter, FindOptions } from "mongodb";

// export type FindQueryTypes = {skip?:number,limit?:number,fields?:FindOptions<T>}
export interface IDBRead<T>{
  find(key?:{skip?:number,limit?:number,fields?:FindOptions<T>}): Promise<T[] | []>
  findOne(item:Filter<T>): Promise<T | null>
}