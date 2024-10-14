import { Card, CardContent } from "@/components/ui/card";
import { type UseChatOptions, useChat } from "ai/react";
import { useId } from "react";

const useChatWrapper = (options?: UseChatOptions) => {
  const id = useId();
  const chat = useChat({ ...(options ?? {}), id });
  return chat;
};

export const Chat: React.FC = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChatWrapper({
    api: import.meta.env.CHAT_ENDPOINT,
    keepLastMessageOnError: true,
  });

  return (
    <Card>
      <CardContent>
        {messages.map((message) => (
          <div key={message.id}>
            {message.role === "user" ? "User: " : "AI: "}
            {message.content}
          </div>
        ))}

        <form onSubmit={handleSubmit}>
          <input name="prompt" value={input} onChange={handleInputChange} />
          <button type="submit">Submit</button>
        </form>
      </CardContent>
    </Card>
  );
};
