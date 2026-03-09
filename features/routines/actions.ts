"use server";

import { RoutineType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createRoutineAction(userId: string, formData: FormData) {
  await prisma.routine.create({
    data: {
      userId,
      name: String(formData.get("name")),
      type: String(formData.get("type")) as RoutineType,
      tasks: { create: [{ title: String(formData.get("task") || "Core task") }] }
    }
  });
  revalidatePath("/routines");
}

export async function toggleTaskAction(taskId: string, done: boolean) {
  await prisma.routineTask.update({ where: { id: taskId }, data: { isCompleted: done } });
  revalidatePath("/routines");
}
