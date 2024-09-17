// Header 컴포넌트
import React from "react";

const Header = (): JSX.Element => {
  return (
    <div className="flex flex-wrap justify-between gap-3 p-4">
      <div className="flex min-w-72 flex-col gap-3">
        <p className="text-[#0e141b] tracking-light text-[32px] font-bold leading-tight">
          Upload files
        </p>
        <p className="text-[#4e7397] text-sm font-normal leading-normal">
          Upload files or add a link to start sharing.
        </p>
      </div>
    </div>
  );
};

export default Header;
