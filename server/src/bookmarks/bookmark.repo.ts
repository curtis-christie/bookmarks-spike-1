import { db } from "../db.js";

export function list() {
  return db.bookmark.findMany({ orderBy: { createdAt: "desc" } });
}

export function findById(id: string) {
  return db.bookmark.findUnique({ where: { id } });
}
