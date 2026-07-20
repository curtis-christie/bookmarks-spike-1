import type { Request, Response } from "express";
import * as service from "./bookmark.service.js";
import type { ZodError } from "zod";
import {
  createBookmarkSchema,
  updateBookmarkSchema,
} from "./bookmark.schema.js";
import { ValidationError } from "../errors.js";

function formatIssues(error: ZodError) {
  return error.issues
    .map(
      (issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`,
    )
    .join("; ");
}

export async function list(_req: Request, res: Response) {
  const bookmarks = await service.list();
  res.json(bookmarks);
}

export async function getById(req: Request, res: Response) {
  const id = req.params.id as string;
  const bookmark = await service.getById(id);
  res.json(bookmark);
}

export async function create(req: Request, res: Response) {
  const parsed = createBookmarkSchema.safeParse(req.body);
  if (!parsed.success)
    throw new ValidationError(formatIssues(parsed.error));

  const bookmark = await service.create(parsed.data);
  res.status(201).json(bookmark);
}

export async function update(req: Request, res: Response) {
  const id = req.params.id as string;
  const parsed = updateBookmarkSchema.safeParse(req.body);
  if (!parsed.success)
    throw new ValidationError(formatIssues(parsed.error));

  const bookmark = await service.update(id, parsed.data);
  res.json(bookmark);
}

export async function remove(req: Request, res: Response) {
  const id = req.params.id as string;
  await service.remove(id);
  res.status(204).end();
}
