// TabNavigation 컴포넌트
import React from "react";

const TabNavigation = (): JSX.Element => {
  return (
    <div className="pb-3">
      <div className="flex border-b border-[#d0dbe7] px-4 gap-8">
        <TabItem label="Upload" active />
        <TabItem label="Link" />
      </div>
    </div>
  );
};

// TabItem 컴포넌트
type TTabItemProps = {
  label: string;
  active?: boolean;
};

const TabItem = ({ label, active }: TTabItemProps): JSX.Element => {
  return (
    <a
      className={`flex flex-col items-center justify-center border-b-[3px] ${
        active
          ? "border-b-[#1980e6] text-[#0e141b]"
          : "border-b-transparent text-[#4e7397]"
      } pb-[13px] pt-4`}
      href="#"
    >
      <p
        className={`${active ? "text-[#0e141b]" : "text-[#4e7397]"} text-sm font-bold leading-normal tracking-[0.015em]`}
      >
        {label}
      </p>
    </a>
  );
};

export default TabNavigation;
