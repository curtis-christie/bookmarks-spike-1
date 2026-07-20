import * as repo from "./bookmark.repo.js";
import { NotFoundError } from "../errors.js";
import {
  createBookmarkInput,
  updateBookmarkInput,
} from "./bookmark.schema.js";

export function list() {
  return repo.list();
}

export async function getById(id: string) {
  const bookmark = await repo.findById(id);
  if (!bookmark) throw new NotFoundError("Bookmark not found");
  return bookmark;
}

export function create(data: createBookmarkInput) {
  return repo.create(data);
}

export async function update(id: string, data: updateBookmarkInput) {
  await getById(id);
  return repo.update(id, data);
}

export async function remove(id: string) {
  await getById(id);
  return repo.remove(id);
}
