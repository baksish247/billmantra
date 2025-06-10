// src/app/settings/security/page.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PolicyContent } from "./content";

export default function SecurityPolicyPage() {
  return (
    <div className="container max-w-3xl py-8 px-4">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Security & Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[75vh] pr-2">
            <PolicyContent />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
