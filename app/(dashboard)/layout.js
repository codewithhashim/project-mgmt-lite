export default function DashboardLayout({ children }) {
  return (
    <section className="flex h-screen">
      <aside className="w-64 bg-gray-800 p-6 text-white">
        <h2 className="text-lg font-bold">Menu</h2>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </section>
  );
}
