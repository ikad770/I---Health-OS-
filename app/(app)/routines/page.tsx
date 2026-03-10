import { RoutineType } from "@prisma/client";
import { createRoutineAction, toggleTaskAction } from "@/features/routines/actions";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export default async function RoutinesPage() {
  const user = await requireUser();
  const dbUser = await prisma.user.findUniqueOrThrow({ where: { email: user.email! } });
  const routines = await prisma.routine.findMany({ where: { userId: dbUser.id }, include: { tasks: true } });
  const action = createRoutineAction.bind(null, dbUser.id);

  return <main className="space-y-4"><form action={action} className="glass grid gap-2 p-4 md:grid-cols-4"><input name="name" placeholder="Routine name" className="rounded-xl border border-white/20 bg-transparent px-3 py-2"/><select name="type" className="rounded-xl border border-white/20 bg-transparent px-3 py-2">{Object.keys(RoutineType).map((v)=><option key={v}>{v}</option>)}</select><input name="task" placeholder="First task" className="rounded-xl border border-white/20 bg-transparent px-3 py-2"/><button className="rounded-xl bg-blue-500 px-4 py-2">Create</button></form><section className="grid gap-4 md:grid-cols-2">{routines.map((r: (typeof routines)[number])=><article key={r.id} className="glass p-4"><h2 className="font-semibold">{r.name}</h2><p className="text-xs text-slate-400">{r.type}</p>{r.tasks.map((t: (typeof r.tasks)[number])=><form key={t.id} action={toggleTaskAction.bind(null,t.id,!t.isCompleted)} className="mt-2"><button className="rounded-lg border border-white/20 px-2 py-1 text-sm">{t.isCompleted?"✓":"○"} {t.title}</button></form>)}</article>)}</section></main>;
}
