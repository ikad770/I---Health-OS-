"use server";

import { ActivityLevel, ConsumptionLevel, Gender } from "@prisma/client";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function onboardingAction(userId: string, formData: FormData) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      dateOfBirth: formData.get("dateOfBirth") ? new Date(String(formData.get("dateOfBirth"))) : null,
      gender: String(formData.get("gender")) as Gender
    }
  });

  const height = Number(formData.get("heightCm"));
  const weight = Number(formData.get("weightKg"));
  const bmi = height && weight ? +(weight / ((height / 100) ** 2)).toFixed(1) : null;

  await prisma.healthProfile.upsert({
    where: { userId },
    update: {
      heightCm: height,
      weightKg: weight,
      bmi,
      waistCm: Number(formData.get("waistCm")) || null,
      bodyFatPercent: Number(formData.get("bodyFatPercent")) || null,
      activityLevel: String(formData.get("activityLevel")) as ActivityLevel,
      smokingStatus: String(formData.get("smokingStatus")) as ConsumptionLevel,
      alcoholConsumption: String(formData.get("alcoholStatus")) as ConsumptionLevel,
      sleepQuality: Number(formData.get("sleepQuality")) || null,
      stressLevel: Number(formData.get("stressLevel")) || null
    },
    create: {
      userId,
      heightCm: height,
      weightKg: weight,
      bmi,
      waistCm: Number(formData.get("waistCm")) || null,
      bodyFatPercent: Number(formData.get("bodyFatPercent")) || null,
      activityLevel: String(formData.get("activityLevel")) as ActivityLevel,
      smokingStatus: String(formData.get("smokingStatus")) as ConsumptionLevel,
      alcoholConsumption: String(formData.get("alcoholStatus")) as ConsumptionLevel,
      sleepQuality: Number(formData.get("sleepQuality")) || null,
      stressLevel: Number(formData.get("stressLevel")) || null
    }
  });

  const goals = String(formData.get("goals") || "").split(",").map((v) => v.trim()).filter(Boolean);
  if (goals.length) {
    await prisma.goal.deleteMany({ where: { userId } });
    await prisma.goal.createMany({ data: goals.map((title, idx) => ({ userId, title, isPrimary: idx === 0 })) });
  }

  redirect("/dashboard");
}
