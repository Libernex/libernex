import WelcomePanel from "@components/Chat/WelcomePanel.tsx";
import ChatForm from "@components/Chat/ChatForm.tsx";

function ChatContainer(): JSX.Element {
    return (
        <div className="h-screen">
            <WelcomePanel nickname={"Lyght"} />
            <ChatForm />
        </div>
    )
}

export default ChatContainer;