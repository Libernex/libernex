// LinkSection 컴포넌트
import { Globe, NotebookPen } from "lucide-react";
import React from "react";
import UploadOption from "./UploadOption";

const LinkSection = (): JSX.Element => {
  return (
    <>
      <h2 className="text-[#0e141b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Add a link
      </h2>
      <UploadOption icon={Globe} label="Add from web" />
      <UploadOption icon={NotebookPen} label="Create a new note" />
    </>
  );
};

export default LinkSection;
