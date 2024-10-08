import React from "react";
import "@/feature/Chat/styles/styles.css";
import WelcomeMessage from "@/feature/Chat/components/WelcomeMessage.tsx";
import SampleTemplateSection from "@/feature/Chat/components/SampleTemplateSection.tsx";

interface WelcomePanelProps {
  nickname: string;
  setTemplateText: (text: string) => void;
}

function WelcomePanel({
  nickname,
  setTemplateText,
}: WelcomePanelProps): JSX.Element {
  return (
    <div style={{ overflowX: "hidden" }}>
      <WelcomeMessage nickname={nickname} />
      <SampleTemplateSection setTemplateText={setTemplateText} />
    </div>
  );
}

export default WelcomePanel;
