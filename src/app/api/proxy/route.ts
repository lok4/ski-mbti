import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename"); // e.g., "polar-bear.png"

    if (!filename) {
        return new NextResponse("Filename required", { status: 400 });
    }

    // Security: Prevent directory traversal
    const safeFilename = path.basename(filename);

    // Construct path to public images
    // Note: Vercel includes 'public' folder in runtime
    const filePath = path.join(process.cwd(), "public", "images", safeFilename);

    try {
        const fileBuffer = fs.readFileSync(filePath);

        // Return image with strict CORS headers allowing * 
        // This is safe because these are public static assets anyway
        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": "image/png",
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        console.error("Proxy error:", error);
        return new NextResponse("File not found", { status: 404 });
    }
}
