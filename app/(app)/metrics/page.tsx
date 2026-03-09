import { addMetricAction, addWeightAction } from "@/features/metrics/actions";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export default async function MetricsPage() {
  const user = await requireUser();
  const dbUser = await prisma.user.findUniqueOrThrow({ where: { email: user.email! } });
  const [weights, metrics] = await Promise.all([
    prisma.weightLog.findMany({ where: { userId: dbUser.id }, orderBy: { loggedAt: "desc" }, take: 10 }),
    prisma.bodyMetric.findMany({ where: { userId: dbUser.id }, orderBy: { loggedAt: "desc" }, take: 10 })
  ]);

  return <main className="space-y-4"><section className="grid gap-4 md:grid-cols-2"><form action={addWeightAction.bind(null,dbUser.id)} className="glass space-y-2 p-4"><h2 className="font-semibold">Log weight</h2><input name="valueKg" placeholder="kg" className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2"/><button className="rounded-xl bg-blue-500 px-4 py-2">Add</button></form><form action={addMetricAction.bind(null,dbUser.id)} className="glass grid gap-2 p-4"><h2 className="font-semibold">Log body metrics</h2><input name="bodyFatPercent" placeholder="Body fat %" className="rounded-xl border border-white/20 bg-transparent px-3 py-2"/><input name="waistCm" placeholder="Waist cm" className="rounded-xl border border-white/20 bg-transparent px-3 py-2"/><input name="muscleMassKg" placeholder="Muscle mass kg" className="rounded-xl border border-white/20 bg-transparent px-3 py-2"/><button className="rounded-xl bg-blue-500 px-4 py-2">Save</button></form></section><section className="grid gap-4 md:grid-cols-2"><article className="glass p-4"><h3 className="mb-2">Weight history</h3>{weights.map((w)=><p key={w.id}>{new Date(w.loggedAt).toLocaleDateString("he-IL")} - {w.valueKg} kg</p>)}</article><article className="glass p-4"><h3 className="mb-2">Body metrics history</h3>{metrics.map((m)=><p key={m.id}>{new Date(m.loggedAt).toLocaleDateString("he-IL")} · Fat {m.bodyFatPercent ?? "-"}% · Waist {m.waistCm ?? "-"}</p>)}</article></section></main>;
}
