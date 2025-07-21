// components/ProjectCard.js
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link"; // Import Link
import { Button } from "@/components/ui/button"; // Import Button

export default function ProjectCard({ project }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {project.status && (
          <p className="text-sm font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full inline-block">
            {project.status}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Link href={`/dashboard/projects/${project.id}`}>
          <Button variant="outline">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}