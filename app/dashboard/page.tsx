const widgets = [
  "Health score",
  "Today's routines",
  "Medication reminders",
  "Supplements",
  "Weight trend",
  "Hydration",
  "Lab alerts",
  "AI insights"
];

export default function DashboardPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 p-6">
      <h1 className="text-3xl font-semibold text-blue-200">Health Command Center</h1>
      <p className="text-slate-300">Modular dashboard for routine tracking, medication management, and preventive health insights.</p>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {widgets.map((widget) => (
          <article key={widget} className="glass p-5">
            <h2 className="text-lg font-medium">{widget}</h2>
            <p className="mt-2 text-sm text-slate-300">Demo data visualization area.</p>
          </article>
        ))}
      </section>
    </main>
  );
}
