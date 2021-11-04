export interface IFile {
  originalName: string;
  size: number;
  buffer: File;
}

export interface IMessageFile {
  href: string;
  name: string;
  size: number;
  type: string;
}
