export type FileUpload = {
  file: File;
  filename: string;
};

export type FileModel = {
  uploader: string;
  name: string;
  size: number;
  type: string;
  temporaryUrl: string;
};
