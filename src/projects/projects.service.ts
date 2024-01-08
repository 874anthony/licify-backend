import { Express } from 'express';
import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './schemas/projects.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    images?: Express.Multer.File[],
  ): Promise<ProjectDocument> {
    if (images) {
      const uploadResult = await this.cloudinaryService.uploadImages(images);
      createProjectDto.images = uploadResult.map((result) => result.secure_url);
    }

    createProjectDto.price = Number(createProjectDto.price);

    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  findAll(queryParams): Promise<ProjectDocument[]> {
    return this.projectModel
      .find(queryParams)
      .populate('constructorClient')
      .populate('provider')
      .exec();
  }

  findOne(id: string): Promise<ProjectDocument> {
    return this.projectModel
      .findById(id)
      .populate('constructorClient')
      .populate('provider')
      .exec();
  }

  findAllProjectsByConstructorClient(id: string): Promise<ProjectDocument[]> {
    return this.projectModel
      .find({ constructorClient: id })
      .populate('constructorClient')
      .populate('provider')
      .exec();
  }

  findAllProjectsByProvider(id: string): Promise<ProjectDocument[]> {
    return this.projectModel
      .find({ provider: id })
      .populate('constructorClient')
      .populate('provider')
      .exec();
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
    images?: Express.Multer.File[],
  ) {
    if (images) {
      const uploadResult = await this.cloudinaryService.uploadImages(images);
      updateProjectDto.images = uploadResult.map((result) => result.secure_url);
    }

    updateProjectDto.price = Number(updateProjectDto.price);

    return this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, {
        new: true,
      })
      .exec();
  }

  remove(id: string) {
    this.projectModel.findByIdAndDelete(id).exec();
  }
}
