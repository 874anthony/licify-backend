import { Express } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { SignUpDto } from './dto/sign-up.dto';
import { LogInDto } from './dto/login.dto';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async signIn({ email, password }: LogInDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException('Invalid credentials!');

    const payload = { id: user._id, email: user.email, name: user.name };
    return {
      name: user.name,
      businessName: user.businessName,
      role: user.role,
      email: user.email,
      avatar: user.avatar || '',
      timestamp: new Date().toISOString(),
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(signUpDto: SignUpDto, avatar?: Express.Multer.File) {
    if (avatar) {
      const uploadResult = await this.cloudinaryService.uploadImage(avatar);
      signUpDto.avatar = uploadResult.secure_url;
    }

    const user = await this.usersService.create(signUpDto);
    const payload = { id: user._id, email: user.email, name: user.name };
    return {
      name: user.name,
      businessName: user.businessName,
      role: user.role,
      email: user.email,
      avatar: user.avatar || '',
      timestamp: new Date().toISOString(),
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
