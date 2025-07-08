// components/ProjectCard.js
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProjectCard({ project }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      {/* Future content like tasks, status, etc., can go here */}
      {/* <CardContent>
        <p>More details or actions here...</p>
      </CardContent> */}
    </Card>
  );
}