import Logger from 'config/winston';
import { IDBRead } from 'interfaces/IDBRead';
import { IDBWrite } from 'interfaces/IDBWrite';
import { Db, Collection, InsertOneResult, OptionalId, FindOptions, MongoServerError, DeleteResult, Filter } from 'mongodb';
// import { result } from "lodash";


export abstract class BaseRepository<T> implements IDBWrite<OptionalId<T>>, IDBRead<T>{
  public readonly _collection: Collection<T>
  // private _db: Db;

  constructor(db: Db, collectionName: string) {
    this._collection = db.collection(collectionName)
    // this._db = db
  }
  async create(item: OptionalId<T>): Promise<boolean> {
    try {
      Logger.info(item)
      const result: InsertOneResult = await this._collection.insertOne(item)
      // this._db.
      return !!result.acknowledged
    } catch (e) {
      if (e instanceof MongoServerError) {
        Logger.error(e)
        return Promise.reject(e)
      }
      Logger.error(e)
      return Promise.reject(e)
    }
  }
  async update(field: Filter<T>, item: any) {
    try {
      const updateResult = await this._collection.updateOne(field, { $set: item });
      console.log(updateResult)
      return Promise.resolve(updateResult)
    } catch (e) {
      if (e instanceof MongoServerError) {
        console.log(`Error worth logging: ${e}`); // special case for some reason
        Logger.error(e)
        return Promise.reject(e)
      }
      Logger.error(e)
      return Promise.reject(e)
    }
  }
  async delete(field: Filter<T>): Promise<DeleteResult> {
    try {
      const result: DeleteResult = await this._collection.deleteOne(field)
      return Promise.resolve(result)
    } catch (e) {
      if (e instanceof MongoServerError) {
        Logger.error(e)
        return Promise.reject(e)
      }
      Logger.error(e)
      return Promise.reject(e)
    }
    // throw new Error("Method not implemented.")
  }
  async find(key?: { skip?: number, limit?: number, fields?: FindOptions<T> }): Promise<T[]> {
    try {
      const result = await this._collection.find({}, { skip: key?.skip, limit: key?.limit }).toArray();
      return result;

    } catch (e) {
      if (e instanceof MongoServerError) {
        Logger.error(e)
        return Promise.reject(e)
      }
      Logger.error(e)
      return Promise.reject(e)
    }

  }
  async findOne(_item: Filter<T>): Promise<T | null> {
    try {
      Logger.info(_item)
      const result = await this._collection.findOne(_item)
      
      return Promise.resolve(result)

    } catch (e) {
      Logger.error(e)

      return Promise.reject(e);
    }
  }

}