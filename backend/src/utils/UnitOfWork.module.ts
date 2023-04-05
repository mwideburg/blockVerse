import { Inject } from '@nestjs/common';
import { DataSource, getConnection, getConnectionManager, DataSourceOptions, Connection, QueryRunner, EntityManager } from 'typeorm';
import { IUnitOfWork } from './IUnitOfWork';



export class TypeOrmUnitOfWork implements IUnitOfWork {
  private readonly asyncDatabaseConnection: DataSource;
  private readonly queryRunner: QueryRunner;
  private transactionManager: EntityManager;

  constructor(
    @Inject(TYPES.AsyncDatabaseConnection) asyncDatabaseConnection: Connection,
  ) {
    this.asyncDatabaseConnection = asyncDatabaseConnection;
    this.queryRunner = this.asyncDatabaseConnection.createQueryRunner();
  }

  setTransactionManager() {
    this.transactionManager = this.queryRunner.manager;
  }

  async start() {
    await this.queryRunner.startTransaction();
    this.setTransactionManager();
  }

  getRepository<T>(R: new (transactionManager: EntityManager) => T): T {
    if (!this.transactionManager) {
      throw new Error('Unit of work is not started. Call the start() method');
    }
    return new R(this.transactionManager);
  }

  async complete(work: () => void) {
    try {
      await work();
      await this.queryRunner.commitTransaction();
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await this.queryRunner.release();
    }
  }
}
