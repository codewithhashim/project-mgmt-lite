// components/TaskList.js
"use client"; // Needs to be a client component for interactive elements (future)

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function TaskList({ tasks, users }) {
  if (!tasks || tasks.length === 0) {
    return <p className="text-gray-500">No tasks found for this project yet.</p>;
  }

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : "Unassigned";
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardHeader>
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>Status: {task.status}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">{task.description}</p>
            <p className="text-xs text-gray-500 mt-2">Assigned to: {getUserName(task.assignedToId)}</p>
            <p className="text-xs text-gray-500">Created: {new Date(task.createdAt).toLocaleDateString()}</p>
            {/* Edit/Delete buttons will go here later */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}