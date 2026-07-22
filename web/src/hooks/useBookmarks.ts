import { useQuery } from "@tanstack/react-query";
import { listBookmarks } from "../api/bookmarks";

export function useBookmarks() {
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: listBookmarks,
  });
}
