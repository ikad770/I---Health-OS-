import { z } from "zod";

export const medicationSchema = z.object({
  name: z.string().min(2),
  dosage: z.string().min(1),
  frequency: z.string().min(1),
  timing: z.string().min(1),
  mealRelation: z.string().min(1),
  reason: z.string().optional(),
  prescribingDoctor: z.string().optional(),
  startDate: z.string().min(1),
  endDate: z.string().optional()
});

export const supplementSchema = z.object({
  name: z.string().min(2),
  dosage: z.string().min(1),
  frequency: z.string().min(1),
  timing: z.string().min(1),
  category: z.string().min(1),
  goal: z.string().optional()
});
