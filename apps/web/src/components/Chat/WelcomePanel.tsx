import React from 'react';
import './styles.css';

interface WelcomePanelProps {
    nickname: string
}

function WelcomePanel({ nickname }: WelcomePanelProps): JSX.Element {
    return (
        <div className="flex flex-col">
            <span className="font-bold text-6xl p-4 animate-gradient text-gradient">
                {nickname}님, 안녕하세요
            </span>
            <span>어떤 정보를 찾아드릴까요?</span>
        </div>
    );
}

export default WelcomePanel;