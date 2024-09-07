export interface ChatInterface {
  id: string;
  sender: {
    nickname: string;
    avatarSrc: string;
  };
  sentAt: string;
  message: string;
  status?: string;
}
