// components/ProjectCard.js
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link"; // Import Link

export default function ProjectCard({ project }) {
  return (
    <Link href={`/dashboard/projects/${project.id}`} className="block hover:shadow-lg transition-shadow duration-200">
      <Card>
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        {/* Optional: Add more content or actions if needed in CardContent */}
      </Card>
    </Link>
  );
}