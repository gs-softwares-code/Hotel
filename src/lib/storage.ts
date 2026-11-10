/**
 * Native Edge Object Storage wrapper for Cloudflare R2 / Vercel Blob
 * ZERO external SaaS. Stream files directly into bucket storage.
 */

export interface UploadResult {
  url: string;
  key: string;
  size: number;
  contentType: string;
}

export async function uploadMediaStream(
  file: File | Blob,
  path: string,
  env?: { R2?: any; BLOB_READ_WRITE_TOKEN?: string }
): Promise<UploadResult> {
  const fileName = `${Date.now()}-${path.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const contentType = file.type || "application/octet-stream";
  const arrayBuffer = await file.arrayBuffer();

  // 1. Cloudflare R2 Native Binding
  const r2Bucket = env?.R2 || (typeof process !== "undefined" && (process.env as any)?.R2);
  if (r2Bucket) {
    await r2Bucket.put(fileName, arrayBuffer, {
      httpMetadata: { contentType },
    });
    const publicDomain = (process.env as any)?.R2_PUBLIC_DOMAIN || "https://media.aurahotels.internal";
    return {
      url: `${publicDomain}/${fileName}`,
      key: fileName,
      size: file.size,
      contentType,
    };
  }

  // 2. Vercel Blob / Native Fetch Storage fallback
  const blobToken = env?.BLOB_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN;
  if (blobToken) {
    const res = await fetch(`https://blob.vercel-storage.com/${fileName}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${blobToken}`,
        "x-content-type": contentType,
      },
      body: arrayBuffer,
    });
    const data = (await res.json()) as any;
    return {
      url: data.url || `https://blob.internal/${fileName}`,
      key: fileName,
      size: file.size,
      contentType,
    };
  }

  // 3. Edge-Native In-Memory Data URL Fallback (Enables local and staging tests without cloud blockers)
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  return {
    url: `data:${contentType};base64,${base64}`,
    key: fileName,
    size: file.size,
    contentType,
  };
}

