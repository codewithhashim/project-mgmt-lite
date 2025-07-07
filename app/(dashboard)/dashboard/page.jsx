// app/(dashboard)/dashboard/page.js
import { getProjects } from "@/lib/data";
import CreateProjectForm from "@/components/CreateProjectForm";
// Import Shadcn Card components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

      <h2 className="text-xl font-semibold mb-4 mt-8">Your Projects</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}