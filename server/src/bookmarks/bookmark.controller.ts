import type { Request, Response } from "express";
import * as service from "./bookmark.service.js";

export async function list(_req: Request, res: Response) {
  const bookmarks = await service.list();
  res.json(bookmarks);
}

export async function getById(req: Request, res: Response) {
  const id = req.params.id as string;
  const bookmark = service.getById(id);
  res.json(bookmark);
}
