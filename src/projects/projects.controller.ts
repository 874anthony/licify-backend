import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  create(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFiles() images?: Express.Multer.File[],
  ) {
    return this.projectsService.create(createProjectDto, images);
  }

  @Get()
  findAll(@Query() queryParams) {
    return this.projectsService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Get('constructor-client/:id')
  findAllProjectsByConstructorClient(@Param('id') id: string) {
    return this.projectsService.findAllProjectsByConstructorClient(id);
  }

  @Get('provider/:id')
  findAllProjectsByProvider(@Param('id') id: string) {
    return this.projectsService.findAllProjectsByProvider(id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images'))
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @UploadedFiles() images?: Express.Multer.File[],
  ) {
    return this.projectsService.update(id, updateProjectDto, images);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
