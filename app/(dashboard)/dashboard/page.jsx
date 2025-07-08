
import { getProjects } from "@/lib/data";
import CreateProjectForm from "@/components/CreateProjectForm";
import ProjectCard from "@/components/ProjectCard";
import PageHeader from "@/components/PageHeader"; 

export default async function DashboardPage() {
  const projects = await getProjects();

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Manage and create your projects here."
      />

      <div className="mb-8">
        <CreateProjectForm />
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-8">Your Projects</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}