"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function addWeightAction(userId: string, formData: FormData) {
  await prisma.weightLog.create({ data: { userId, valueKg: Number(formData.get("valueKg")) } });
  revalidatePath("/metrics");
}

export async function addMetricAction(userId: string, formData: FormData) {
  await prisma.bodyMetric.create({
    data: {
      userId,
      bodyFatPercent: Number(formData.get("bodyFatPercent")) || null,
      waistCm: Number(formData.get("waistCm")) || null,
      muscleMassKg: Number(formData.get("muscleMassKg")) || null
    }
  });
  revalidatePath("/metrics");
}
