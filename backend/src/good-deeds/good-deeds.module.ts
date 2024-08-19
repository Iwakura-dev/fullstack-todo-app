import { Module } from '@nestjs/common';
import { GoodDeedsController } from './good-deeds.controller';
import { GoodDeedsService } from './good-deeds.service';
import { MongooseModule } from "@nestjs/mongoose";
import { GoodDeed, GoodDeedSchema } from "./schema/good-deeds.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GoodDeed.name, schema: GoodDeedSchema }]),
  ],
  controllers: [GoodDeedsController],
  providers: [GoodDeedsService]
})
export class GoodDeedsModule { }
