import { useChat } from "ai/react";
import type { PropsWithChildren } from "react";
import { ChatCtx } from "./chatCtx";

export const ChatProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const chat = useChat({
    api: import.meta.env.VITE_CHAT_ENDPOINT,
    keepLastMessageOnError: true,
  });

  return <ChatCtx.Provider value={chat}>{children}</ChatCtx.Provider>;
};
