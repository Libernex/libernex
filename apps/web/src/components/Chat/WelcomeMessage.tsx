function WelcomeMessage({ nickname }: {nickname: string}): JSX.Element {
    return (
        <div className="flex flex-col m-4">
            <span className="font-bold text-6xl p-2 animate-gradient text-gradient">
                {nickname}님, 안녕하세요
            </span>
            <span className="font-bold text-6xl p-2 text-gray-300">어떤 정보를 찾아드릴까요?</span>
        </div>
    )
}

export default WelcomeMessage;