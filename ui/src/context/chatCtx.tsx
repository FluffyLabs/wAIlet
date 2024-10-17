import type { useChat as useChatAi } from "ai/react";
import { createContext, useContext } from "react";

type ChatCtx = ReturnType<typeof useChatAi>;

export const ChatCtx = createContext<ChatCtx>({} as ChatCtx);
export const useChat = () => useContext(ChatCtx);
