import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const IMAGES_DIR = path.join(process.cwd(), "src", "assets", "images");

const MIME_TYPES: Record<string, string> = {
  webp: "image/webp",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  svg: "image/svg+xml",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params;

  const joined = segments.join("/");
  if (joined.includes("..")) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const imagePath = path.join(IMAGES_DIR, ...segments);

  if (!imagePath.startsWith(IMAGES_DIR)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  try {
    const buffer = fs.readFileSync(imagePath);
    const ext = segments[segments.length - 1].split(".").pop()?.toLowerCase() ?? "";
    const contentType = MIME_TYPES[ext] ?? "application/octet-stream";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not Found", { status: 404 });
  }
}
