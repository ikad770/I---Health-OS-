import { saveProfileAction } from "@/features/profile/actions";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export default async function ProfilePage() {
  const user = await requireUser();
  const dbUser = await prisma.user.findUniqueOrThrow({ where: { email: user.email! }, include: { healthProfile: true, goals: true } });
  const action = saveProfileAction.bind(null, dbUser.id);

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Health Profile</h1>
      <form action={action} className="glass grid gap-3 p-5 md:grid-cols-2">
        <input name="heightCm" defaultValue={dbUser.healthProfile?.heightCm ?? ""} placeholder="Height" className="rounded-xl border border-white/20 bg-transparent px-3 py-2" />
        <input name="weightKg" defaultValue={dbUser.healthProfile?.weightKg ?? ""} placeholder="Weight" className="rounded-xl border border-white/20 bg-transparent px-3 py-2" />
        <input name="waistCm" defaultValue={dbUser.healthProfile?.waistCm ?? ""} placeholder="Waist" className="rounded-xl border border-white/20 bg-transparent px-3 py-2" />
        <input name="bodyFatPercent" defaultValue={dbUser.healthProfile?.bodyFatPercent ?? ""} placeholder="Body Fat" className="rounded-xl border border-white/20 bg-transparent px-3 py-2" />
        <input name="sleepQuality" defaultValue={dbUser.healthProfile?.sleepQuality ?? ""} placeholder="Sleep quality" className="rounded-xl border border-white/20 bg-transparent px-3 py-2" />
        <input name="stressLevel" defaultValue={dbUser.healthProfile?.stressLevel ?? ""} placeholder="Stress" className="rounded-xl border border-white/20 bg-transparent px-3 py-2" />
        <button className="md:col-span-2 rounded-xl bg-blue-500 px-4 py-2">Save profile</button>
      </form>
    </main>
  );
}
