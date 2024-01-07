import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Own modules
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['config/development.env'],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: function (config: ConfigService) {
        const DB_URI = config.get<string>('DB_URI');
        const DB_PASSWORD = config.get<string>('DB_PASSWORD');

        return { uri: DB_URI.replace('<password>', DB_PASSWORD) };
      },
    }),
    AuthModule,
    ProjectsModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
