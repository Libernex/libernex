import React from 'react';
import './styles.css';
import WelcomeMessage from "@components/Chat/WelcomeMessage.tsx";
import SampleTemplateSection from "@components/Chat/SampleTemplateSection.tsx";

interface WelcomePanelProps {
    nickname: string
}

function WelcomePanel({ nickname }: WelcomePanelProps): JSX.Element {
    return (
        <div>
            <WelcomeMessage nickname={nickname} />
            <SampleTemplateSection />
        </div>
    );
}

export default WelcomePanel;