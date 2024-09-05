import React from 'react';
import './styles.css';
import WelcomeMessage from "@components/Chat/WelcomeMessage.tsx";

interface WelcomePanelProps {
    nickname: string
}

function WelcomePanel({ nickname }: WelcomePanelProps): JSX.Element {
    return (
        <WelcomeMessage nickname={nickname} />
    );
}

export default WelcomePanel;