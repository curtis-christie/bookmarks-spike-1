import { db } from "../db.js";
import {
  createBookmarkInput,
  updateBookmarkInput,
} from "./bookmark.schema.js";

export function list() {
  return db.bookmark.findMany({ orderBy: { createdAt: "desc" } });
}

export function findById(id: string) {
  return db.bookmark.findUnique({ where: { id } });
}

export function create(data: createBookmarkInput) {
  return db.bookmark.create({ data });
}

export function update(id: string, data: updateBookmarkInput) {
  return db.bookmark.update({ where: { id }, data });
}

export function remove(id: string) {
  return db.bookmark.delete({ where: { id } });
}
