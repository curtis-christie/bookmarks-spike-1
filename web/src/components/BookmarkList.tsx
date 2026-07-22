import { useBookmarks } from "../hooks/useBookmarks";

export function BookmarkList() {
  const { data, isPending, isError, error } = useBookmarks();

  if (isPending) return <p>Loading...</p>;
  if (isError)
    return <p role="alert">Could not load bookmarks: {error.message}</p>;
  if (data.length === 0) return <p>no bookmarks yet.</p>;

  return (
    <ul>
      {data.map((bookmark) => (
        <li key={bookmark.id}>
          <a href={bookmark.url} target="_blank" rel="noreferrer">
            {bookmark.title}
          </a>
          {bookmark.note && <span> - {bookmark.note}</span>}
        </li>
      ))}
    </ul>
  );
}
