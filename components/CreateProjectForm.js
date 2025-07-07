// components/CreateProjectForm.js
"use client";

import { useRef } from "react";
import { createProject } from "@/lib/actions";
import SubmitButton from "./SubmitButton";
// Import Shadcn UI components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateProjectForm() {
  const formRef = useRef(null);

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create a New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          ref={formRef}
          action={async (formData) => {
            await createProject(formData);
            formRef.current?.reset();
          }}
          className="space-y-4" // Tailwind class for vertical spacing
        >
          <div>
            <Label htmlFor="name">Project Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              rows={3}
              className="mt-1"
            />
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}