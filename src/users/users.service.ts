import { Express } from 'express';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);

    const salt = await bcrypt.genSalt();
    createdUser.password = await bcrypt.hash(createdUser.password, salt);

    return createdUser.save();
  }

  findAll(queryParams): Promise<UserDocument[]> {
    return this.userModel.find(queryParams).exec();
  }

  getProfile(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    avatar?: Express.Multer.File,
  ): Promise<UserDocument> {
    if (avatar) {
      const uploadResult = await this.cloudinaryService.uploadImage(avatar);
      updateUserDto.avatar = uploadResult.secure_url;
    }

    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async findOneByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email: email }).select('+password').exec();
  }
}
