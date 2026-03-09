import { onboardingAction } from "@/features/profile/onboarding-actions";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export default async function OnboardingPage() {
  const user = await requireUser();
  const dbUser = await prisma.user.findUniqueOrThrow({ where: { email: user.email! } });
  const action = onboardingAction.bind(null, dbUser.id);

  return (
    <main className="glass max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">Onboarding Health Profile</h1>
      <form action={action} className="grid gap-3 md:grid-cols-2">
        <input name="dateOfBirth" type="date" className="rounded-xl border border-white/20 bg-transparent px-3 py-2" />
        <select name="gender" className="rounded-xl border border-white/20 bg-transparent px-3 py-2"><option>MALE</option><option>FEMALE</option><option>OTHER</option></select>
        <input name="heightCm" placeholder="Height cm" className="rounded-xl border border-white/20 bg-transparent px-3 py-2" />
        <input name="weightKg" placeholder="Weight kg" className="rounded-xl border border-white/20 bg-transparent px-3 py-2" />
        <input name="waistCm" placeholder="Waist cm" className="rounded-xl border border-white/20 bg-transparent px-3 py-2" />
        <input name="bodyFatPercent" placeholder="Body fat %" className="rounded-xl border border-white/20 bg-transparent px-3 py-2" />
        <select name="activityLevel" className="rounded-xl border border-white/20 bg-transparent px-3 py-2"><option>LOW</option><option>MODERATE</option><option>HIGH</option><option>ATHLETE</option></select>
        <select name="smokingStatus" className="rounded-xl border border-white/20 bg-transparent px-3 py-2"><option>NEVER</option><option>OCCASIONAL</option><option>REGULAR</option></select>
        <select name="alcoholStatus" className="rounded-xl border border-white/20 bg-transparent px-3 py-2"><option>NEVER</option><option>OCCASIONAL</option><option>REGULAR</option></select>
        <input name="sleepQuality" placeholder="Sleep quality 1-10" className="rounded-xl border border-white/20 bg-transparent px-3 py-2" />
        <input name="stressLevel" placeholder="Stress level 1-10" className="rounded-xl border border-white/20 bg-transparent px-3 py-2" />
        <textarea name="goals" placeholder="Goals comma separated" className="md:col-span-2 rounded-xl border border-white/20 bg-transparent px-3 py-2" />
        <button className="md:col-span-2 rounded-xl bg-blue-500 px-4 py-3">Continue</button>
      </form>
    </main>
  );
}
