import { Body, Request, Controller, Post, UseGuards, Get, Param, Put, Req, Delete } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { GoodDeedsService } from "./good-deeds.service";

@Controller('good-deeds')
@UseGuards(AuthGuard('jwt'))
export class GoodDeedsController {
  constructor(private goodDeedsService: GoodDeedsService) { }

  @Post('create')
  async create(@Body() body: { title: string, description: string; }, @Request() req): Promise<any> {
    return this.goodDeedsService.create(req.user.userId, body.title, body.description);
  }
  @Get()
  async findAll(@Request() req): Promise<any> {
    return this.goodDeedsService.findAll(req.user.userId);
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.goodDeedsService.findOne(id);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: { title: string; description: string; }): Promise<any> {
    return this.goodDeedsService.update(id, body.title, body.description);
  }
  @Delete(":id")
  async delete(@Param('id') id: string): Promise<any> {
    return this.goodDeedsService.delete(id);
  }
}
