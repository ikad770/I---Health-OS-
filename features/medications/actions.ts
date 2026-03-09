"use server";

import { MedicationTiming, MealRelation } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function addMedicationAction(userId: string, formData: FormData) {
  await prisma.medication.create({
    data: {
      userId,
      name: String(formData.get("name")),
      dosage: String(formData.get("dosage")),
      frequency: String(formData.get("frequency")),
      timing: String(formData.get("timing")) as MedicationTiming,
      mealRelation: String(formData.get("mealRelation")) as MealRelation,
      reason: String(formData.get("reason") || ""),
      prescribingDoctor: String(formData.get("prescribingDoctor") || ""),
      startDate: new Date(String(formData.get("startDate"))),
      endDate: formData.get("endDate") ? new Date(String(formData.get("endDate"))) : null
    }
  });
  revalidatePath("/medications");
}

export async function deleteMedicationAction(id: string) {
  await prisma.medication.delete({ where: { id } });
  revalidatePath("/medications");
}
