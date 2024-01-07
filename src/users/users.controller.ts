import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findAll(@Query() queryParams) {
    return this.userService.findAll(queryParams);
  }

  @Get('/me')
  getPofile(@Request() request) {
    return this.userService.getProfile(request.user.id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    return this.userService.update(id, updateUserDto, avatar);
  }
}
