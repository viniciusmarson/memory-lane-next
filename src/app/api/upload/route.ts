import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

const ONE_MB = 1024 * 1024;
const MAX_FILE_SIZE = 5 * ONE_MB; // 5MB

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("image") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      {
        error: "File too large",
        maxSize: `${MAX_FILE_SIZE / ONE_MB}MB`,
        uploadedSize: `${(file.size / ONE_MB).toFixed(2)}MB`,
      },
      { status: 400 }
    );
  }

  // Check file type
  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "File must be an image" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const timestamp = Date.now();
  const uploadDir = path.join(process.cwd(), "public/uploads");
  const filePath = path.join(uploadDir, `${timestamp}-${file.name}`);

  try {
    await writeFile(filePath, buffer);
    return NextResponse.json({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/uploads/${timestamp}-${file.name}`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
