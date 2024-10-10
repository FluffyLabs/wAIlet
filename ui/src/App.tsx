import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Teleport } from "./Teleport";
import { AccountProvider } from "./context/AccountProvider";
import { ExtensionProvider } from "./context/ExtensionProvider";

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
              <div className="grid grid-cols-2 gap-8">
                <Card>
                  <CardContent>Chat</CardContent>
                </Card>
                <Teleport />
              </div>
            </AccountProvider>
          </ExtensionProvider>
        </CardContent>
      </Card>
    </div>
  );
}
