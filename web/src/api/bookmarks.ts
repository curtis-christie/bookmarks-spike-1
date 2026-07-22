import type { Bookmark } from "../types";
import { apiFetch } from "./client";

export function listBookmarks() {
  return apiFetch<Bookmark[]>("/bookmarks");
}
