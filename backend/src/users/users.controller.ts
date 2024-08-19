import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from "./users.service";
import { User } from "./schema/users.schema";

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Post()
  create(@Body() body: { username: string, password: string; }): Promise<User> {
    return this.userService.create(body.username, body.password);
  }
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Get(":id")
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }
  @Put(":id")
  update(@Param('id') id: string, @Body() body: { username: string, password: string; }): Promise<User> {
    return this.userService.update(id, body.username, body.password);
  }
  @Delete(":id")
  delete(@Param("id") id: string): Promise<User> {
    return this.userService.delete(id);
  }
}
