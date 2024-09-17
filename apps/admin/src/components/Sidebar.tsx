// Sidebar 컴포넌트
import { Crown, Settings, Folder, Link, NotebookPen } from "lucide-react";
import React from "react";
import FooterItem from "./Footer";

const Sidebar = (): JSX.Element => {
  return (
    <div className="layout-content-container flex flex-col w-80">
      <div className="flex h-full min-h-[700px] flex-col justify-between bg-slate-50 p-4">
        <SidebarMenu />
        <SidebarFooter />
      </div>
    </div>
  );
};

// SidebarMenu 컴포넌트
const SidebarMenu = (): JSX.Element => {
  const menuItems = [
    { icon: "Files", label: "Files", active: true },
    { icon: "Link", label: "Links" },
    { icon: "NotebookPen", label: "Notes" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-[#0e141b] text-base font-medium leading-normal">
        Console
      </h1>
      <div className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <SidebarMenuItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

// SidebarMenuItem 컴포넌트
type TSidebarMenuItemProps = {
  icon: string;
  label: string;
  active?: boolean;
};

const SidebarMenuItem = ({
  icon,
  label,
  active,
}: TSidebarMenuItemProps): JSX.Element => {
  const Icon = icon === "Files" ? Folder : icon === "Link" ? Link : NotebookPen;
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 ${active ? "rounded-xl bg-[#e7edf3]" : ""}`}
    >
      <Icon className="text-[#0e141b]" size={24} />
      <p className="text-[#0e141b] text-sm font-medium leading-normal">
        {label}
      </p>
    </div>
  );
};

// SidebarFooter 컴포넌트
const SidebarFooter = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-1">
      <FooterItem icon={Crown} label="Upgrade to Pro" />
      <FooterItem icon={Settings} label="Settings" />
    </div>
  );
};

export default Sidebar;
