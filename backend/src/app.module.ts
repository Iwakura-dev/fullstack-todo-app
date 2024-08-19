import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { User, UserSchema } from "./users/schema/users.schema";
import { UsersModule } from "./users/users.module";
import { GoodDeedsModule } from './good-deeds/good-deeds.module';
import { FriendsModule } from './friends/friends.module';



@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
  MongooseModule.forRoot(process.env.DB_URI),
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule,
    AuthModule,
    GoodDeedsModule,
    FriendsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
