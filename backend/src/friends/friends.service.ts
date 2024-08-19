import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Friend, FriendDocument } from "./schema/friends.schema";
import { Model } from "mongoose";

@Injectable()
export class FriendsService {
  constructor(@InjectModel(Friend.name) private friendModel: Model<FriendDocument>) { }

  async addFriend(userId: string, tag: string): Promise<Friend> {
    const newFriend = new this.friendModel({ userId, tag });
    return newFriend.save();
  }
  async findFriends(userId: string): Promise<Friend[]> {
    return this.friendModel.find({ userId }).exec();
  }
}
