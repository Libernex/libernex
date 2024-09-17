// UploadOption 컴포넌트
import { ArrowRight, LucideIcon } from "lucide-react";
import React from "react";

type TUploadOptionProps = {
  icon: LucideIcon;
  label: string;
};

const UploadOption = ({
  icon: Icon,
  label,
}: TUploadOptionProps): JSX.Element => {
  return (
    <div className="flex items-center gap-4 bg-slate-50 px-4 min-h-14 justify-between">
      <div className="flex items-center gap-4">
        <div className="text-[#0e141b] flex items-center justify-center rounded-lg bg-[#e7edf3] shrink-0 size-10">
          <Icon size={24} />
        </div>
        <p className="text-[#0e141b] text-base font-normal leading-normal flex-1 truncate">
          {label}
        </p>
      </div>
      <div className="shrink-0">
        <ArrowRight className="text-[#0e141b] size-7" />
      </div>
    </div>
  );
};

export default UploadOption;
