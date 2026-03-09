import { prisma } from "@/lib/prisma";

export async function getDashboardData(userId: string) {
  const [profile, routines, meds, supplements, latestWeight, metrics, docs, insights, reminders] = await Promise.all([
    prisma.healthProfile.findUnique({ where: { userId } }),
    prisma.routine.findMany({ where: { userId }, include: { tasks: true } }),
    prisma.medication.findMany({ where: { userId }, take: 5 }),
    prisma.supplement.findMany({ where: { userId }, take: 5 }),
    prisma.weightLog.findFirst({ where: { userId }, orderBy: { loggedAt: "desc" } }),
    prisma.bodyMetric.findFirst({ where: { userId }, orderBy: { loggedAt: "desc" } }),
    prisma.labDocument.findMany({ where: { userId }, orderBy: { uploadedAt: "desc" }, take: 3 }),
    prisma.insight.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 3 }),
    prisma.reminder.findMany({ where: { userId, isEnabled: true }, take: 5 })
  ]);

  const healthScore = Math.max(45, Math.min(97, Math.round(100 - (profile?.stressLevel ?? 5) * 2 + (profile?.sleepQuality ?? 6) * 3)));

  return { healthScore, routines, meds, supplements, latestWeight, metrics, docs, insights, reminders };
}
