import React, { useState, useCallback } from "react";
import Image from "next/image";
import { Popover } from "@repo/ui/popover";
import FileIconMapper from "@/feature/Chat/mapper/FileIconMapper.tsx";

interface UploadedFileWrapsProps {
  files: File[];
  handleFileRemove: (name: string, lastModified: number) => void;
}

function UploadedFileWraps({
  files,
  handleFileRemove,
}: UploadedFileWrapsProps): JSX.Element {
  return (
    <div className="flex flex-row gap-4 px-4">
      {files.map((file) => (
        <div className="pt-1 pb-0" key={`${file.name}_${file.lastModified}`}>
          <FileWrap file={file} onClick={handleFileRemove} />
        </div>
      ))}
    </div>
  );
}

function FileWrap({
  file,
  onClick,
}: {
  file: File;
  onClick: (name: string, lastModified: number) => void;
}): JSX.Element {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsPopoverVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPopoverVisible(false);
  }, []);

  const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
  const src = file.type.startsWith("image")
    ? URL.createObjectURL(file)
    : FileIconMapper[fileExtension];

  return (
    <div>
      <div
        className="relative flex justify-center items-center w-14 h-14 bg-gray-100 rounded-lg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          alt={file.name}
          className="w-3/4 h-3/4"
          height={24}
          src={src}
          width={24}
        />
        <CloseButton />
      </div>
      <Popover
        id={`popover-${file.name}`}
        isArrow
        isVisible={isPopoverVisible}
        message={`Size: ${file.size}`}
        title={file.name}
      />
    </div>
  );

  function CloseButton() {
    return (
      <button
        aria-label="Close"
        className="absolute top-0 right-0 pl-1"
        onClick={(): void => {
          onClick(file.name, file.lastModified);
        }}
      >
        <Image alt="Close icon" height={24} src="/C-Close.svg" width={24} />
      </button>
    );
  }
}

export default UploadedFileWraps;
