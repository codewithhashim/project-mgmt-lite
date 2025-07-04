import Button from "@/components/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Project Management Lite</h1>
      <p className="mt-2">The journey begins!</p>
      <Button variant="primary" size="large">
        <Link href="/dashboard">Go to dashboard</Link>
      </Button>
    </main>
  );
}
