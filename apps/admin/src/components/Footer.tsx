import { LucideIcon } from "lucide-react";
import React from "react";

type TFooterItemProps = {
  icon: LucideIcon;
  label: string;
};

const FooterItem = ({ icon: Icon, label }: TFooterItemProps): JSX.Element => {
  return (
    <div className="flex items-center gap-3 px-3 py-2">
      <Icon className="text-[#0e141b]" size={24} />
      <p className="text-[#0e141b] text-sm font-medium leading-normal">
        {label}
      </p>
    </div>
  );
};

export default FooterItem;
