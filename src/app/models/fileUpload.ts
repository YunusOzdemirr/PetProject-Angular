export class FileUpload {
  name: string;
  url: string;
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}
