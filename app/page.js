
import Link from "next/link";
import { Button } from "@/components/ui/button"; 

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-4 text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
        ProjectLite
      </h1>
      <p className="text-lg md:text-xl mb-8 max-w-xl opacity-90">
        Your simple and efficient project management companion. Organize tasks, track progress, and collaborate seamlessly.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/sign-in">
          <Button variant="secondary" size="lg" className="w-full sm:w-auto">
            Get Started
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline" size="lg" className="w-full sm:w-auto text-blue-600 border-white hover:bg-white hover:text-blue-600">
            View Dashboard (Demo)
          </Button>
        </Link>
      </div>
    </main>
  );
}