import React from "react";
import "./styles.css";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";

function App(): JSX.Element {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </div>
  );
}

export default App;
