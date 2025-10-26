export async function toGrayscale(base64Png: string): Promise<string> {
  const img = await loadImage(base64Png);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const buf = data.data;
  for (let i = 0; i < buf.length; i += 4) {
    const y = 0.2126 * buf[i] + 0.7152 * buf[i + 1] + 0.0722 * buf[i + 2];
    buf[i] = buf[i + 1] = buf[i + 2] = y;
  }
  ctx.putImageData(data, 0, 0);
  return canvas.toDataURL("image/png");
}

export function loadImage(base64Png: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = `data:image/png;base64,${base64Png}`;
  });
}
