"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/lib/auth";

export async function signupAction(formData: FormData) {
  const parsed = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(8) }).safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password")
  });
  if (!parsed.success) return { error: "Invalid input" };

  const exists = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (exists) return { error: "Email already exists" };

  await prisma.user.create({
    data: { name: parsed.data.name, email: parsed.data.email, passwordHash: await bcrypt.hash(parsed.data.password, 10), language: "he" }
  });

  await signIn("credentials", { email: parsed.data.email, password: parsed.data.password, redirect: false });
  redirect("/onboarding");
}

export async function loginAction(formData: FormData) {
  await signIn("credentials", {
    email: String(formData.get("email") || ""),
    password: String(formData.get("password") || ""),
    redirectTo: "/dashboard"
  });
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}
