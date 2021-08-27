import { Injectable } from '@nestjs/common';
import { FileFieldResponse, FileResponse } from './dto/fileResponse';

@Injectable()
export class AppService {
  async mapSingleFileResponse(
    file: Express.Multer.File,
    path: string,
  ): Promise<FileResponse> {
    const parsePath = path.replace(/\\/gi, '/');
    console.log('file', file);
    const map: FileResponse = {
      fileName: file.filename,
      originalName: file.originalname,
      fileUrl: `${process.env.SERVER_HOST}${parsePath}/${file.filename}`,
      size: file.size,
      storedDir: file.path,
    };
    return map;
  }

  async mapArrayFileResponse(
    files: Array<Express.Multer.File>,
    path: string,
  ): Promise<FileResponse[]> {
    const parsePath = path.replace(/\\/gi, '/');
    const maps: FileResponse[] = [];
    for (const file of files) {
      const map: FileResponse = {
        fileName: file.filename,
        originalName: file.originalname,
        fileUrl: `${process.env.SERVER_HOST}${parsePath}/${file.filename}`,
        size: file.size,
        storedDir: file.path,
      };
      maps.push(map);
    }

    return maps;
  }

  async mapFieldFileResponse(
    path: string,
    file1?: Express.Multer.File[],
    file2?: Express.Multer.File[],
  ): Promise<FileFieldResponse> {
    const parsePath = path.replace(/\\/gi, '/');
    const file1Array: FileResponse[] = [];
    const file2Array: FileResponse[] = [];
    for (const file of file1) {
      const map: FileResponse = {
        fileName: file.filename,
        originalName: file.originalname,
        fileUrl: `${process.env.SERVER_HOST}${parsePath}/${file.filename}`,
        size: file.size,
        storedDir: file.path,
      };
      file1Array.push(map);
    }
    for (const file of file2) {
      const map: FileResponse = {
        fileName: file.filename,
        originalName: file.originalname,
        fileUrl: `${process.env.SERVER_HOST}${parsePath}/${file.filename}`,
        size: file.size,
        storedDir: file.path,
      };
      file2Array.push(map);
    }
    const returnVal: FileFieldResponse = {
      file1: file1Array,
      file2: file2Array,
    };
    return returnVal;
  }
}
