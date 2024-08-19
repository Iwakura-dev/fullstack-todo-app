import { Controller, Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { FriendsService } from "./friends.service";

@Controller('friends')
@UseGuards(AuthGuard('jwt'))
export class FriendsController {
  constructor(private friendsService: FriendsService) { }

  @Post('/add-friends')
  async addFriend(@Body() body: { tag: string; }, @Request() req): Promise<any> {
    return this.friendsService.addFriend(req.user.userId, body.tag);
  }
  @Get()
  async findFriends(@Request() req): Promise<any> {
    return this.friendsService.findFriends(req.user.userId);
  }
}
