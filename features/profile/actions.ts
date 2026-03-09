"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function saveProfileAction(userId: string, formData: FormData) {
  const height = Number(formData.get("heightCm"));
  const weight = Number(formData.get("weightKg"));
  const bmi = height && weight ? +(weight / ((height / 100) ** 2)).toFixed(1) : null;

  await prisma.healthProfile.upsert({
    where: { userId },
    update: {
      heightCm: height || null,
      weightKg: weight || null,
      bmi,
      waistCm: Number(formData.get("waistCm")) || null,
      bodyFatPercent: Number(formData.get("bodyFatPercent")) || null,
      sleepQuality: Number(formData.get("sleepQuality")) || null,
      stressLevel: Number(formData.get("stressLevel")) || null
    },
    create: { userId, heightCm: height || null, weightKg: weight || null, bmi }
  });

  revalidatePath("/profile");
}
