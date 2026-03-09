import { SupplementCategory } from "@prisma/client";
import { addSupplementAction, deleteSupplementAction } from "@/features/supplements/actions";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export default async function SupplementsPage() {
  const user = await requireUser();
  const dbUser = await prisma.user.findUniqueOrThrow({ where: { email: user.email! } });
  const items = await prisma.supplement.findMany({ where: { userId: dbUser.id }, orderBy: { createdAt: "desc" } });
  const action = addSupplementAction.bind(null, dbUser.id);

  return <main className="grid gap-4 lg:grid-cols-2"><form action={action} className="glass space-y-2 p-5"><h1 className="text-xl">Add supplement</h1><input name="name" placeholder="Name" className="w-full rounded-xl border border-cyan-300/20 bg-transparent px-3 py-2"/><input name="dosage" placeholder="Dosage" className="w-full rounded-xl border border-cyan-300/20 bg-transparent px-3 py-2"/><input name="frequency" placeholder="Frequency" className="w-full rounded-xl border border-cyan-300/20 bg-transparent px-3 py-2"/><input name="timing" placeholder="Timing" className="w-full rounded-xl border border-cyan-300/20 bg-transparent px-3 py-2"/><select name="category" className="w-full rounded-xl border border-cyan-300/20 bg-transparent px-3 py-2">{Object.keys(SupplementCategory).map((v)=><option key={v}>{v}</option>)}</select><input name="goal" placeholder="Goal" className="w-full rounded-xl border border-cyan-300/20 bg-transparent px-3 py-2"/><button className="rounded-xl bg-cyan-500 px-4 py-2">Save</button></form><section className="space-y-3">{items.map((m)=><article key={m.id} className="glass flex items-center justify-between border-cyan-300/20 p-4"><div><p className="font-semibold">{m.name} {m.dosage}</p><p className="text-sm text-slate-400">{m.frequency} · {m.category}</p></div><form action={deleteSupplementAction.bind(null,m.id)}><button className="rounded-lg border border-red-300/40 px-3 py-1">Delete</button></form></article>)}</section></main>;
}
