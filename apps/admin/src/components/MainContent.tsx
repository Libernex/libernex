// MainContent 컴포넌트
import React from "react";
import TabNavigation from "./TabNavigation";
import Header from "./Header.tsx";
import UploadSection from "./UploadSection";
import LinkSection from "./LinkSection";

const MainContent = (): JSX.Element => {
  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      <Header />
      <TabNavigation />
      <UploadSection />
      {/*<LinkSection />*/}
    </div>
  );
};

export default MainContent;
