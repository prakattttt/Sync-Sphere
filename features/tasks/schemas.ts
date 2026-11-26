import { z } from "zod";

/**
 * Form-level schema. Optional selects use "" for "none"; they are converted
 * to null when the task is saved.
 */
export const taskFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Give the task a title")
    .max(120, "Keep the title under 120 characters"),
  description: z
    .string()
    .trim()
    .max(1000, "Keep the description under 1000 characters"),
  status: z.enum(["todo", "in_progress", "done"]),
  assigneeId: z.string(),
  roomSlug: z.string(),
  dueDate: z
    .string()
    .refine((value) => value === "" || /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: "Enter a valid date",
    }),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
