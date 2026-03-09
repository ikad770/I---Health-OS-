"use server";

import { DocumentType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];

export async function addDocumentAction(userId: string, formData: FormData) {
  const file = formData.get("file") as File;
  if (!file || !allowedTypes.includes(file.type) || file.size > 10 * 1024 * 1024) {
    throw new Error("Invalid file");
  }

  await prisma.labDocument.create({
    data: {
      userId,
      title: String(formData.get("title")),
      provider: String(formData.get("provider") || ""),
      documentType: String(formData.get("documentType")) as DocumentType,
      fileName: file.name,
      fileKey: `private/${userId}/${Date.now()}-${file.name}`,
      mimeType: file.type,
      fileSize: file.size,
      notes: String(formData.get("notes") || "")
    }
  });
  revalidatePath("/documents");
}
