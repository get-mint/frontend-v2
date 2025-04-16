"use client";

import { Dispatch, SetStateAction } from "react";
import Editor from "@monaco-editor/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormLabel } from "@/components/ui/form";

interface AdvancedTabProps {
  metadata: string;
  setMetadata: Dispatch<SetStateAction<string>>;
}

export function AdvancedTab({ metadata, setMetadata }: AdvancedTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Settings</CardTitle>
        <CardDescription>
          Manage technical details and metadata
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <FormLabel>Metadata (JSON)</FormLabel>
          <Editor
            height="300px"
            defaultLanguage="json"
            value={metadata}
            onChange={(value) => setMetadata(value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 12,
            }}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Advanced configuration in JSON format. Must be valid JSON.
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 