// file: components/CreateProjectForm.js
"use client"; // <-- Add this directive

import { useRef } from "react";
import { createProject } from "@/lib/actions";
import SubmitButton from "./SubmitButton"; // <-- Import the new button

export default function CreateProjectForm() {
  const formRef = useRef(null);

  return (
    <form
      ref={formRef}
      // We pass the action to a wrapper function to reset the form on success
      action={async (formData) => {
        await createProject(formData);
        formRef.current?.reset();
      }}
      className="rounded-lg border bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-bold">Create a New Project</h2>
      <div className="mt-4 flex flex-col gap-4">
        {/* ... input fields for name and description ... */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Project Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <SubmitButton /> {/* <-- Use the new button */}
      </div>
    </form>
  );
}