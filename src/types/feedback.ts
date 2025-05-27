import { z } from "zod";


export const CategorySchema = z.union([
  z.literal("UX"),
  z.literal("UI"),
  z.literal("Feature"),
  z.literal("Other"),
  z.null(),
]);

export type Category = z.infer<typeof CategorySchema>;

export const ALLOWED_CATEGORIES_FOR_FORM: Exclude<Category, null>[] = ["UX", "UI", "Feature", "Other"];