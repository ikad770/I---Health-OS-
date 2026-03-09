import { MedicationTiming, MealRelation } from "@prisma/client";
import { addMedicationAction, deleteMedicationAction } from "@/features/medications/actions";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export default async function MedicationsPage() {
  const user = await requireUser();
  const dbUser = await prisma.user.findUniqueOrThrow({ where: { email: user.email! } });
  const items = await prisma.medication.findMany({ where: { userId: dbUser.id }, orderBy: { createdAt: "desc" } });
  const action = addMedicationAction.bind(null, dbUser.id);

  return <main className="grid gap-4 lg:grid-cols-2"><form action={action} className="glass space-y-2 p-5"><h1 className="text-xl">Add medication</h1><input name="name" placeholder="Name" className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2"/><input name="dosage" placeholder="Dosage" className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2"/><input name="frequency" placeholder="Frequency" className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2"/><select name="timing" className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2">{Object.keys(MedicationTiming).map((v)=><option key={v}>{v}</option>)}</select><select name="mealRelation" className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2">{Object.keys(MealRelation).map((v)=><option key={v}>{v}</option>)}</select><input name="reason" placeholder="Reason" className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2"/><input name="prescribingDoctor" placeholder="Doctor" className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2"/><input name="startDate" type="date" className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2"/><input name="endDate" type="date" className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2"/><button className="rounded-xl bg-blue-500 px-4 py-2">Save</button></form><section className="space-y-3">{items.map((m)=><article key={m.id} className="glass flex items-center justify-between p-4"><div><p className="font-semibold">{m.name} {m.dosage}</p><p className="text-sm text-slate-400">{m.frequency} · {m.timing}</p></div><form action={deleteMedicationAction.bind(null,m.id)}><button className="rounded-lg border border-red-300/40 px-3 py-1">Delete</button></form></article>)}</section></main>;
}
