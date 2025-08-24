export function getFullImageUrl(path?: string) {
  if (!path) return "/placeholder.svg";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  return `http://localhost:8000/images/products/thumbnails/${path}`;
}
