"use server";

import { SupplementCategory } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function addSupplementAction(userId: string, formData: FormData) {
  await prisma.supplement.create({
    data: {
      userId,
      name: String(formData.get("name")),
      dosage: String(formData.get("dosage")),
      frequency: String(formData.get("frequency")),
      timing: String(formData.get("timing")),
      category: String(formData.get("category")) as SupplementCategory,
      goal: String(formData.get("goal") || "")
    }
  });
  revalidatePath("/supplements");
}

export async function deleteSupplementAction(id: string) {
  await prisma.supplement.delete({ where: { id } });
  revalidatePath("/supplements");
}
