import { Express } from 'express';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LogInDto } from './dto/login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/shared/decorators/public-routes.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('signup')
  async register(
    @Body() signUpDto: SignUpDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    return await this.authService.register(signUpDto, avatar);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async signIn(@Body() loginDto: LogInDto) {
    return await this.authService.signIn(loginDto);
  }
}
