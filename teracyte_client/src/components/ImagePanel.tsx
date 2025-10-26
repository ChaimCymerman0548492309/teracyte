import { useEffect, useMemo, useState } from "react";
import type { ImagePayload } from "../types";
import { toGrayscale } from "../lib/image";

export default function ImagePanel({ image }: { image: ImagePayload | null }) {
  const [processed, setProcessed] = useState<string | null>(null);
  const [on, setOn] = useState(false);

useEffect(() => {
  let mounted = true;
  const run = async () => {
    if (!image?.image_data_base64) return;
    try {
      const gray = await toGrayscale(image.image_data_base64);
      if (mounted) setProcessed(gray);
    } catch {
      console.warn("Failed to process image");
    }
  };
  setProcessed(null);
  run();
  return () => {
    mounted = false;
  };
}, [image?.image_id]);

  const src = useMemo(() => {
    if (!image) return "";
    return on && processed ? processed : `data:image/png;base64,${image.image_data_base64}`;
  }, [image, on, processed]);

  if (!image) return null;

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <strong>Image:</strong>
        <span>{image.image_id}</span>
        <label style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          <input type="checkbox" checked={on} onChange={(e) => setOn(e.target.checked)} />
          Processed
        </label>
      </div>
      <img
        src={src}
        alt={image.image_id}
        style={{ maxWidth: "100%", border: "1px solid #ddd", borderRadius: 8 }}
      />
    </div>
  );
}
