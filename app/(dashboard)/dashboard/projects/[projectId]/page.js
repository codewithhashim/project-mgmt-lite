// app/(dashboard)/dashboard/projects/[projectId]/page.js
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma"; // Import prisma client
import PageHeader from "@/components/PageHeader";
import TaskList from "@/components/TaskList"; // We'll create this next
import CreateTaskForm from "@/components/CreateTaskForm"; // We'll create this too

export default async function ProjectDetailPage({ params }) {
  const { projectId } = await params;

  // Fetch project details from the database
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { tasks: { orderBy: { createdAt: 'desc' } } }, // Include tasks for the project
  });

  if (!project) {
    notFound(); // Renders the closest not-found.js or a generic 404
  }

  // Fetch users for assigning tasks (for now, all users)
  const users = await prisma.user.findMany(); // Or filter based on project access

  return (
    <div>
      <PageHeader
        title={project.name}
        description={project.description || "No description provided."}
      >
        {/* You could add buttons here like "Edit Project" */}
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
          {/* Pass projectId and users to the form */}
          <CreateTaskForm projectId={project.id} users={users} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Tasks for this Project</h2>
          {/* Pass tasks to the task list component */}
          <TaskList tasks={project.tasks} users={users} />
        </div>
      </div>
    </div>
  );
}