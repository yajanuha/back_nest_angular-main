import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module'; // ✅ Importa tu ConfigModule real
import { databaseProviders } from './database.providers';
import { ConfigService } from 'src/config/config.service';
import { config } from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(config: ConfigService)=>({

        type:'postgres',
        host:config.get('HOST') || 'localhost',
        port: +config.get('PORT_DB'),
        username: config.get('USERNAME'),
        password: config.get('PASSWORD'),
        database: config.get('DATABASE'),
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
      })

    })
  ],
 
  providers: [...databaseProviders, ConfigService],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
