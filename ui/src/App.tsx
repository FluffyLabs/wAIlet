import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chat } from "./Chat/Chat";
import { AccountProvider } from "./context/AccountProvider";
import { ChatProvider } from "./context/ChatProvider";
import { ExtensionProvider } from "./context/ExtensionProvider";
import { TransactionProvider } from "./context/TransactionProvider";

export default function LoginForm() {
  return (
    <div className="flex items-center justify-center mt-6">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">wAIlet</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <ExtensionProvider>
            <AccountProvider>
              <ChatProvider>
                <div className="grid grid-flow-col auto-cols-fr gap-8">
                  <Chat />
                  <TransactionProvider />
                </div>
              </ChatProvider>
            </AccountProvider>
          </ExtensionProvider>
        </CardContent>
      </Card>
    </div>
  );
}
