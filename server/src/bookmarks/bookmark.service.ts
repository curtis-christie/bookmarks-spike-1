import * as repo from "./bookmark.repo.js";
import { NotFoundError } from "../errors.js";

export function list() {
  return repo.list();
}

export async function getById(id: string) {
  const bookmark = await repo.findById(id);
  if (!bookmark) throw new NotFoundError("Bookmark not found");
  return bookmark;
}
