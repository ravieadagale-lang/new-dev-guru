// Dev-Guru Image Resolver

export function resolveImageUrl(imagePath?: string): string {
  if (!imagePath) {
    return "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80";
  }

  // Absolute external URLs
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://") || imagePath.startsWith("data:")) {
    return imagePath;
  }

  // Clean relative or local paths
  let cleanPath = imagePath.trim();
  if (cleanPath.startsWith("./")) {
    cleanPath = cleanPath.slice(2);
  }
  if (cleanPath.startsWith("public/")) {
    cleanPath = cleanPath.slice(6);
  } else if (cleanPath.startsWith("/public/")) {
    cleanPath = cleanPath.slice(7);
  }

  // If path references /src/assets or src/assets, strip /src so it resolves to static /assets in production
  if (cleanPath.startsWith("/src/assets/")) {
    cleanPath = cleanPath.slice(4); // becomes /assets/...
  } else if (cleanPath.startsWith("src/assets/")) {
    cleanPath = cleanPath.slice(3); // becomes /assets/...
  }

  if (!cleanPath.startsWith("/")) {
    cleanPath = "/" + cleanPath;
  }

  return cleanPath;
}
