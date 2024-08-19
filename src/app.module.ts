// This file contains the configuration layer, which ensembles the app modules of the entities, controllers and services
import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entities';
import { FinancialRecord } from './entities/financialRecord.entity';
import { Microcredit } from './entities/microcredit.entity';
import { MicrocreditsModule } from './microcredits/microcredits.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      database: 'my_db',
      password: '12345678',
      port: 3306,
      host: 'localhost',
      synchronize: true,
      entities: [User, FinancialRecord, Microcredit]
    }),
    MicrocreditsModule
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}