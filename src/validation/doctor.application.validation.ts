export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const isAcceptedFileSize = (fileSize: number) => {
  return fileSize <= MAX_FILE_SIZE;
};

export const acceptedFileTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export function isAcceptedFileType(fileType: string) {
  return acceptedFileTypes.includes(fileType);
}
