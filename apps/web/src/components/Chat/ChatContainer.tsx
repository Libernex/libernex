'use client'
import WelcomePanel from "@components/Chat/WelcomePanel";
import ChatForm from "@components/Chat/ChatForm";
import SampleTemplateSection from "@components/Chat/SampleTemplateSection";

function ChatContainer(): JSX.Element {
    const handleSubmit = (message: string): void => {
        console.log("submit!");
    }

    return (
        <div className="h-screen w-screen grid grid-cols-4 mt-16">
            <aside className="col-span-1">
                사이드바
            </aside>
            <main className="col-span-3">
                <WelcomePanel nickname={"Lyght"} />
                <SampleTemplateSection />
                <ChatForm onSubmit={handleSubmit}/>
            </main>
        </div>
    )
}

export default ChatContainer;