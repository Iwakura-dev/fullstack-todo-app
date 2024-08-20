import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { GoodDeed, GoodDeedDocument } from "./schema/good-deeds.schema";
import { Model } from "mongoose";

@Injectable()
export class GoodDeedsService {
  constructor(@InjectModel(GoodDeed.name) private goodDeedModel: Model<GoodDeedDocument>) { }

  async create(userId: string, title: string, description: string): Promise<GoodDeed> {
    const newGoodDeed = new this.goodDeedModel({ userId, title, description });
    return newGoodDeed.save();
  }
  async findAll(userId: string): Promise<GoodDeed[]> {
    return this.goodDeedModel.find({ userId }).exec();
  }
  async findOne(userId: string): Promise<GoodDeed> {
    return this.goodDeedModel.findById(userId).exec();
  }
  async update(id: string, title: string, description: string): Promise<GoodDeed> {
    return this.goodDeedModel.findByIdAndUpdate(id, { title, description }, { new: true }).exec();
  }
  async delete(userId: string): Promise<GoodDeed> {
    return this.goodDeedModel.findByIdAndDelete(userId).exec();
  }
}
