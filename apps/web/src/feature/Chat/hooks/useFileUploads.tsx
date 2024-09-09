import React, { useState } from "react";

const useFileUploads = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDragEnter = (e: React.DragEvent<HTMLTextAreaElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLTextAreaElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLTextAreaElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (!files || files.length <= 0) return;
    console.log(files);

    setFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleFileRemove = (name: string, lastModified: number): void => {
    const results = files.filter(
      (file) => !(file.name === name && file.lastModified === lastModified),
    );
    setFiles(results);
  };

  return {
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileRemove,
    files,
  };
};

export default useFileUploads;
