import { Dispatch, SetStateAction } from "react";

type FileUploadProps = {
  imageUrl: string;
  onFieldChange: (value: string) => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

const FileUploader = ({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploadProps) => {
  return <div className="flex  border-2 text-red-500 items-center justify-center font-bold">FileUploader(in progress)</div>;
};

export default FileUploader;
