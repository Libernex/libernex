export interface ChatInterface {
    sender: {
        nickname: string;
        avatarSrc: string;
    };
    message: MessageInterface;
    status?: string;
}

export interface MessageInterface {
    id: string;
    sentAt: string;
    author: {
        role: string;
        name: string;
    };
    content: {
        contentType: "text" | "file" | "link";
        body: string;
    }
}
