export interface ChatInterface {
  id: string;
  sender: {
    role: "assistance" | "system" | "user";
    nickname: string;
    avatarSrc: string;
  };
  sentAt: string;
  parts: MessageInterface[];
  status?: string;
}

export interface MessageInterface {
  id: string;
  sentAt: string;
  author: {
    role: "assistance" | "system" | "user";
    name: string;
  };
  content: {
    contentType: "text" | "file" | "link";
    body: string;
  };
}
