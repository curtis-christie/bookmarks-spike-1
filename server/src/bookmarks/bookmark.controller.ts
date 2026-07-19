import type { Request, Response } from "express";
import * as service from "./bookmark.service.js";

export async function list(_req: Request, res: Response) {
  const bookmarks = await service.list();
  res.json(bookmarks);
}
