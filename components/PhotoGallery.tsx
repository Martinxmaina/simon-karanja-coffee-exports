import Photo, { type PhotoRatio } from "./Photo";
import { photo, type PhotoSlot } from "@/lib/photos";

export type GalleryItem = { slot: PhotoSlot; caption: string };

export default function PhotoGallery({
  items,
  ratio = "3/2",
}: {
  items: GalleryItem[];
  ratio?: PhotoRatio;
}) {
  // Drop the empty slots first: auto-fit then reflows the rest, no gaps.
  const shown = items.filter((item) => photo(item.slot));
  if (shown.length === 0) return null;

  return (
    <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-6 p-0">
      {shown.map(({ slot, caption }) => (
        <li key={slot} className="m-0">
          <figure className="m-0">
            <Photo
              slot={slot}
              alt={caption}
              ratio={ratio}
              sizes="(max-width: 640px) 100vw, (max-width: 1240px) 50vw, 380px"
              className="rounded-[var(--r)] border border-[var(--line)] shadow-[var(--shadow)]"
            />
            <figcaption className="fig-note mt-3">{caption}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
