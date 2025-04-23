/*
  Local image from indexedDB
*/
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";

export default function LocalImage({ src, alt }: { src: string; alt: string }) {
  const imageId = parseInt(src.replace("/local-image/", ""), 10);

  const image = useLiveQuery(() => db.images.get(imageId), [imageId]);

  if (!image) {
    return null;
  }

  return (
    <img
      src={image.src}
      loading="lazy"
      alt={alt}
      className="w-full max-w-full h-auto py-2 blur-sm transition-all duration-500"
      onLoad={(e) => e.currentTarget.classList.remove("blur-sm")}
      onError={(e) => e.currentTarget.classList.remove("blur-sm")}
    />
  );
}
