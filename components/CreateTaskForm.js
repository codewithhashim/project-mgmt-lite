// components/CreateTaskForm.js
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom"; // For Server Action feedback
import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { createTask } from "@/lib/actions"; // Your Server Action
import { createTaskSchema } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; 


export default function CreateTaskForm({ projectId, users }) {
  // useFormState is for Server Action response handling
  const [state, formAction] = useFormState(createTask, null);
  const formRef = useRef(null); // To reset the form

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      projectId: projectId, // Set default project ID from props
    },
  });

  // Handle server action response
  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success("Task created successfully!", { id: "task-create-success" });
       
        reset(); // Reset React Hook Form state
        formRef.current?.reset(); // Reset native form fields
      } else {
        console.error("Failed to create task:", state.message);
        toast.error(state.message || "Failed to create task.");
        if (state.errors) {
          // Map server errors to React Hook Form errors
          Object.keys(state.errors).forEach((key) => {
            setError(key, { type: "server", message: state.errors[key] });
          });
        }
      }
    }
  }, [state, reset, setError]); // Include setError in dependencies

  // We need to wrap the handleSubmit with our formAction
  // React Hook Form will validate first, then call formAction with valid data
  const onSubmit = async (data) => {
    // data here is already validated by Zod
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("projectId", data.projectId); // Ensure projectId is passed

    await formAction(formData); // Pass the FormData object to the Server Action
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={formRef} className="space-y-4">
      <div>
        <Label htmlFor="title">Task Title</Label>
        <Input id="title" {...register("title")} className="mt-1" />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea id="description" {...register("description")} rows={3} className="mt-1" />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      {/* This input is hidden as projectId comes from props, but essential for validation */}
      <input type="hidden" {...register("projectId")} value={projectId} />

      {/* Optionally add assignee select later if you want to assign on creation */}
      {/*
      <div>
        <Label htmlFor="assignedTo">Assign To</Label>
        <Select onValueChange={(value) => setValue("assignedToId", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select an assignee" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.assignedToId && <p className="text-red-500 text-sm mt-1">{errors.assignedToId.message}</p>}
      </div>
      */}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Creating Task..." : "Create Task"}
      </Button>
      {state && !state.success && state.message && (
        <p className="text-red-500 text-sm mt-2">{state.message}</p>
      )}
    </form>
  );
}