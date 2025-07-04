// file: app/(dashboard)/dashboard/page.js
import { getProjects } from "@/lib/data";
import CreateProjectForm from "@/components/CreateProjectForm";

export default async function DashboardPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Here are your current projects.
        </p>
      </div>
 <div className="mb-8">
        <CreateProjectForm />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-lg border bg-white p-6 shadow-sm"
          >
            <h2 className="font-bold text-lg">{project.name}</h2>
            <p className="mt-2 text-sm text-gray-500">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}