import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { TodoController } from './todo/todo.controller';
import { TodoModule } from './todo/todo.module';


@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }), MongooseModule.forRoot(process.env.DB_URI), AuthModule, TodoModule],
  controllers: [AppController, TodoController],
  providers: [AppService],
})
export class AppModule { }
