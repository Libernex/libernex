import React, { useState, useEffect, useCallback } from "react";
import FileIconMapper from "@/feature/Chat/mapper/FileIconMapper.tsx";
import Image from "next/image";
import { Popover } from "@repo/ui/popover";

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
        <div key={`${file.name}_${file.lastModified}`} className="pt-1 pb-0">
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
  const src = file.type.startsWith("image") ? URL.createObjectURL(file) : FileIconMapper[fileExtension];
  if (!src) return <></>

  return (
    <div>
      <div
        className="relative flex justify-center items-center w-14 h-14 bg-gray-100 rounded-lg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
            className="w-3/4 h-3/4"
            src={src}
            alt={file.name}
            width={24}
            height={24}
        />
        <CloseButton />
      </div>
      <Popover
        id={`popover-${file.name}`}
        title={file.name}
        message={`Size: ${file.size}`}
        isArrow={true}
        isVisible={isPopoverVisible}
      />
    </div>
  );

  function CloseButton() {
    return (
        <button
            className="absolute top-0 right-0 pl-1"
            aria-label="Close"
            onClick={() => onClick(file.name, file.lastModified)}
        >
          <Image src="/C-Close.svg" alt="Close icon" width={24} height={24} />
        </button>
    );
  }

}


export default UploadedFileWraps;
