import { getDashboardData } from "@/features/dashboard/queries";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export default async function DashboardPage() {
  const user = await requireUser();
  const dbUser = await prisma.user.findUniqueOrThrow({ where: { email: user.email! } });
  const data = await getDashboardData(dbUser.id);

  return (
    <main className="space-y-5">
      <h1 className="text-3xl font-semibold text-blue-200">ברוכים הבאים למרכז הבריאות</h1>
      <section className="grid gap-4 md:grid-cols-4">
        <div className="glass p-5">
          <p className="text-sm text-slate-400">Health Score</p>
          <p className="text-3xl font-semibold">{data.healthScore}</p>
        </div>
        <div className="glass p-5">
          <p className="text-sm text-slate-400">Latest Weight</p>
          <p className="text-3xl font-semibold">{data.latestWeight?.valueKg ?? "-"} kg</p>
        </div>
        <div className="glass p-5">
          <p className="text-sm text-slate-400">Active Meds</p>
          <p className="text-3xl font-semibold">{data.meds.length}</p>
        </div>
        <div className="glass p-5">
          <p className="text-sm text-slate-400">Reminders</p>
          <p className="text-3xl font-semibold">{data.reminders.length}</p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="glass p-5">
          <h2 className="mb-3 text-lg">Today&apos;s routines</h2>
          {data.routines.map((routine: (typeof data.routines)[number]) => (
            <p key={routine.id}>
              {routine.name} · {routine.tasks.filter((task: (typeof routine.tasks)[number]) => task.isCompleted).length}/
              {routine.tasks.length}
            </p>
          ))}
        </article>
        <article className="glass p-5">
          <h2 className="mb-3 text-lg">Insights</h2>
          {data.insights.map((insight: (typeof data.insights)[number]) => (
            <p key={insight.id}>{insight.title}</p>
          ))}
        </article>
      </section>
    </main>
  );
}
