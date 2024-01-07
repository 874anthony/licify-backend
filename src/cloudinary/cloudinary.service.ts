import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

import { CloudinaryResponse } from './cloudinary-response';

@Injectable()
export class CloudinaryService {
  uploadImages(images: Express.Multer.File[]): Promise<CloudinaryResponse[]> {
    const uploadPromises = images.map((image) => this.uploadImage(image));

    return Promise.all(uploadPromises);
  }

  uploadImage(image: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(image.buffer);
    });
  }
}
