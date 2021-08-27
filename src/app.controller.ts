import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { multerOptions } from './lib/multerConfig';
import { FileFieldResponse, FileResponse } from './dto/fileResponse';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadSingle(
    @UploadedFile() file: Express.Multer.File,
    @Query('path') path: string,
  ): Promise<FileResponse> {
    return await this.appService.mapSingleFileResponse(file, path);
  }

  @Post('array')
  @UseInterceptors(FilesInterceptor('files', 10, multerOptions))
  async uploadArray(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Query('path') path: string,
  ): Promise<FileResponse[]> {
    return await this.appService.mapArrayFileResponse(files, path);
  }

  @Post('field')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'file1', maxCount: 10 },
        { name: 'file2', maxCount: 10 },
      ],
      multerOptions,
    ),
  )
  async uploadField(
    @UploadedFiles()
    files: { file1?: Express.Multer.File[]; file2?: Express.Multer.File[] },
    @Query('path') path: string,
  ): Promise<FileFieldResponse> {
    return await this.appService.mapFieldFileResponse(
      path,
      files.file1,
      files.file2,
    );
  }
}
