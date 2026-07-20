import { z } from "zod";

export const createBookmarkSchema = z.strictObject({
  title: z.string().trim().min(1, "Title is required"),
  url: z.url("url must be a valid url"),
  note: z.string().trim().nullish(),
});

export const updateBookmarkSchema = createBookmarkSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "at least one field is required.",
  });

export type createBookmarkInput = z.infer<typeof createBookmarkSchema>;
export type updateBookmarkInput = z.infer<typeof updateBookmarkSchema>;
