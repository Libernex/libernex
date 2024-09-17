// UploadSection 컴포넌트
import { Folder, Link } from "lucide-react";
import React from "react";
import UploadOption from "./UploadOption";

const UploadSection = (): JSX.Element => {
  return (
    <>
      <h2 className="text-[#0e141b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Upload a file
      </h2>
      <UploadOption icon={Folder} label="FILE" />
      <UploadOption icon={Link} label="LINK" />
    </>
  );
};

export default UploadSection;
