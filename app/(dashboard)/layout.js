
import Link from "next/link"; 

export default function DashboardLayout({ children }) {
  return (
    <section className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-8">ProjectLite</h2>
        <nav className="space-y-4">
          <Link href="/dashboard" className="block text-gray-300 hover:text-white transition-colors duration-200">
            Dashboard
          </Link>
          <Link href="/settings" className="block text-gray-300 hover:text-white transition-colors duration-200">
            Settings
          </Link>
          
         
        </nav>
      </aside>
      {/* Main content area */}
      <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
        {children}
      </main>
    </section>
  );
}