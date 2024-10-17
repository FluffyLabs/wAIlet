import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "@/context/chatCtx";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export const Chat: React.FC = () => {
  const chatRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  // biome-ignore lint/correctness/useExhaustiveDependencies: making sure chat scrolls to bottom on any message change
  useEffect(() => {
    if (!chatRef.current) return;
    chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className="flex flex-col h-full gap-5">
      <div className="rounded-lg border p-5 h-96 flex-grow flex flex-col gap-2 overflow-y-auto" ref={chatRef}>
        {messages.map((message) => (
          <div
            className={cn(
              "w-4/5 p-2 rounded-md text-white",
              message.role === "user" ? "bg-black" : "bg-gray-500 ml-auto",
            )}
            key={message.id}
          >
            {message.content}
          </div>
        ))}
        {isLoading && <Spinner className="ml-auto" />}
      </div>
      <form className="flex-grow-0 flex flex-col gap-2" onSubmit={handleSubmit}>
        <Textarea
          value={input}
          onChange={handleInputChange}
          className="resize-none"
          placeholder="What would you like to do?"
          autoSize
          submitOnEnter
        />
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};
