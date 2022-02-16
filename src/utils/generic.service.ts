// import {
//   Injectable, InternalServerErrorException
// } from '@nestjs/common';
// import {
//   FindManyOptions,
//   FindOneOptions,
//   ObjectLiteral,
//   Repository
// } from 'typeorm';
// import {
//   LoggerService
// } from './logger.service';

// @Injectable()
// export abstract class Service<T extends ObjectLiteral, K, L, M> {
//   private readonly _serviceLogger: LoggerService;

//   constructor(
//     logger: LoggerService,
//     private readonly _repository: Repository<T>
//   ) {
//     this._serviceLogger = logger;
//   }

//   async findOne(
//     id: number,
//     options?: FindOneOptions<T>
//   ): Promise<T> {
//     try {
//       return await this._repository.findOne(id, {
//         ...options
//       });
//     } catch (err) {
//       this._serviceLogger.error(`Could not find ${this._repository.metadata.targetName} entry:`);
//       this._serviceLogger.error(err);
//       throw new InternalServerErrorException();
//     }
//   }

//   async findAll(
//     options?: FindManyOptions<T>
//   ): Promise<T[]> {
//     try {
//       return await this._repository.find({
//         ...options
//       });
//     } catch (error) {
//       this._serviceLogger.error(`Could not find ${this._repository.metadata.targetName} entry:`);
//       this._serviceLogger.error(error);
//       throw new InternalServerErrorException();
//     }
//   }

//   async create(data:K): Promise<T>{
//     try {
//       const res = await this._repository.save({
//         ...data
//       });
//       this._serviceLogger.debug(`Created record ${this._repository.metadata.targetName} entry:`);
//       this._serviceLogger.debug(res.id);
//       return res;
//     } catch (error) {
//       this._serviceLogger.error(`Could not created ${this._repository.metadata.targetName} entry:`);
//       this._serviceLogger.error(error);
//       throw new InternalServerErrorException();
//     }
//   }

//   async update(id:number, data:L|M): Promise<T>{
//     try {
//       await this._repository.update(id, {
//         ...data
//       });
//       const res =  await this.findOne(id);
//       this._serviceLogger.debug(`Updated record ${this._repository.metadata.targetName} entry:`);
//       this._serviceLogger.debug(res.id);
//       return res;
//     } catch (error) {
//       this._serviceLogger.error(`Could not updated ${this._repository.metadata.targetName} entry:`);
//       this._serviceLogger.error(error);
//       throw new InternalServerErrorException();
//     }
//   }

//   async delete(id:number): Promise<T>{
//     try {
//       const res =  await this.findOne(id);
//       await this._repository.delete(id);
//       this._serviceLogger.debug(`Deleted record ${this._repository.metadata.targetName} entry:`);
//       this._serviceLogger.debug(res.id);
//       return res;
//     } catch (error) {
//       this._serviceLogger.error(`Could not deleted ${this._repository.metadata.targetName} entry:`);
//       this._serviceLogger.error(error);
//       throw new InternalServerErrorException();
//     }
//   }

// }
