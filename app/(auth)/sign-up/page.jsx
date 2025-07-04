import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold">Sign Up</h1>
      <p className="mt-4">No account? <Link href="/sign-in" className="underline">Sign in </Link></p>
    </div>
  );
}