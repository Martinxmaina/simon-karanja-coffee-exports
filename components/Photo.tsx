import Image from "next/image";
import { photo, type PhotoSlot } from "@/lib/photos";

/** Fixed boxes so the image never reflows once it loads. */
const ratios = {
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
  portrait: "aspect-[3/4]",
} as const;

export type PhotoRatio = keyof typeof ratios;

export default function Photo({
  slot,
  alt,
  ratio = "3/2",
  priority = false,
  // The shell is min(1180px, 100% - 2.5rem): full-bleed below that, capped above.
  sizes = "(max-width: 1240px) 100vw, 1180px",
  className = "",
}: {
  slot: PhotoSlot;
  alt: string;
  ratio?: PhotoRatio;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const entry = photo(slot);
  // ponytail: 4 of 12 slots have no file yet — callers decide what to show instead.
  if (!entry) return null;

  return (
    <div className={`relative overflow-hidden ${ratios[ratio]} ${className}`}>
      <Image
        src={entry.src}
        alt={alt}
        fill
        sizes={sizes}
        placeholder="blur"
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
