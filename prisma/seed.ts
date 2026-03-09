import { PrismaClient, ActivityLevel, ConsumptionLevel, Gender, MedicationTiming, MealRelation, RoutineType, SupplementCategory, InsightSeverity, ReminderType, DocumentType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("demo12345", 10);
  const user = await prisma.user.upsert({
    where: { email: "demo@ihealthos.com" },
    update: {},
    create: {
      email: "demo@ihealthos.com",
      name: "Demo User",
      language: "he",
      gender: Gender.PREFER_NOT_TO_SAY,
      passwordHash: hash,
      healthProfile: {
        create: {
          heightCm: 176,
          weightKg: 79.4,
          bmi: 25.6,
          waistCm: 91,
          bodyFatPercent: 20,
          sleepQuality: 7,
          stressLevel: 5,
          activityLevel: ActivityLevel.MODERATE,
          smokingStatus: ConsumptionLevel.NEVER,
          alcoholConsumption: ConsumptionLevel.OCCASIONAL
        }
      },
      goals: { createMany: { data: [{ title: "Improve sleep", isPrimary: true }, { title: "Lower triglycerides" }] } },
      medications: { createMany: { data: [{ name: "Metformin", dosage: "500mg", frequency: "2x/day", timing: MedicationTiming.MORNING, mealRelation: MealRelation.AFTER_FOOD, reason: "Metabolic support", prescribingDoctor: "Dr. Levi", startDate: new Date() }] } },
      supplements: { createMany: { data: [{ name: "Vitamin D3", dosage: "2000 IU", timing: "Morning", frequency: "Daily", category: SupplementCategory.IMMUNITY, goal: "Support vitamin D levels" }] } },
      routines: {
        create: {
          name: "Morning launch",
          type: RoutineType.MORNING,
          tasks: { createMany: { data: [{ title: "Hydration", order: 1 }, { title: "Supplements", order: 2 }] } }
        }
      },
      reminders: { createMany: { data: [{ type: ReminderType.MEDICATION, title: "Take Metformin", schedule: "08:00" }, { type: ReminderType.ROUTINE, title: "Morning launch", schedule: "07:30" }] } },
      weightLogs: { createMany: { data: [{ valueKg: 81.5, loggedAt: new Date(Date.now() - 1000*60*60*24*14) }, { valueKg: 80.7, loggedAt: new Date(Date.now() - 1000*60*60*24*7) }, { valueKg: 79.4, loggedAt: new Date() }] } },
      bodyMetrics: { create: { waistCm: 91, bodyFatPercent: 20, muscleMassKg: 33.2 } },
      labDocuments: { create: { title: "Quarterly Blood Panel", provider: "MediLab", documentType: DocumentType.BLOOD_TEST, fileName: "blood-panel-q1.pdf", fileKey: "private/demo/blood-panel-q1.pdf", mimeType: "application/pdf", fileSize: 256000 } },
      insights: { createMany: { data: [{ title: "Weight trend improving", content: "You lost 2.1kg in the last 14 days.", severity: InsightSeverity.LOW }, { title: "Monitor stress load", content: "Stress score remained above target in recent check-ins.", severity: InsightSeverity.MEDIUM }] } }
    }
  });

  console.log(`Seeded ${user.email}`);
}

main().finally(async () => prisma.$disconnect());
