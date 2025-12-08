import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { RESULTS } from "@/constants/quiz";
import fs from "fs";
import path from "path";

// Use Node.js runtime to allow access to 50MB+ bundle size (needed for 6MB font)
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const character = searchParams.get("character");

    // Default to a fallback if not found
    const result = character && RESULTS[character] ? RESULTS[character] : RESULTS["BRAVE_POLAR_BEAR"];

    let fontData: ArrayBuffer | null = null;
    let imageBuffer: ArrayBuffer | null = null;

    try {
        // Load Font from FS
        const fontPath = path.join(process.cwd(), "public", "fonts", "NotoSansKR-Bold.ttf");
        const fontFile = fs.readFileSync(fontPath);
        fontData = fontFile.buffer as ArrayBuffer;

        // Load Image from FS
        const imagePath = path.join(process.cwd(), "public", result.imageUrl);
        const imageFile = fs.readFileSync(imagePath);
        imageBuffer = imageFile.buffer as ArrayBuffer;
    } catch (e) {
        console.error("Failed to load assets from FS:", e);
    }

    // Fallback if FS fails (should not happen on Vercel if files are in public)
    if (!fontData || !imageBuffer) {
        return new Response("Failed to load assets", { status: 500 });
    }

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                    backgroundImage: "linear-gradient(to bottom, #eff6ff, #ffffff)",
                    padding: 80,
                    fontFamily: '"NotoSansKR"',
                }}
            >
                {/* Animal Image Circle */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f3f4f6",
                        borderRadius: "100%",
                        padding: 40,
                        marginBottom: 60,
                        width: 500,
                        height: 500,
                        overflow: "hidden",
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={imageBuffer as any}
                        alt={result.title}
                        width={450}
                        height={450}
                        style={{ objectFit: "contain" }}
                    />
                </div>

                {/* Subtitle */}
                <div style={{ fontSize: 48, color: "#3B82F6", fontWeight: 700, marginBottom: 20 }}>
                    우리 아이 스키 성향은
                </div>

                {/* Title */}
                <div style={{ fontSize: 80, fontWeight: 900, color: "#111827", marginBottom: 40, textAlign: 'center' }}>
                    {result.title}
                </div>

                {/* Description Box */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#fffbeb',
                    border: '4px solid #fcd34d',
                    borderRadius: 30,
                    padding: 40,
                    width: '85%',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                    <div style={{ fontSize: 32, color: "#4b5563", textAlign: 'center', lineHeight: 1.5, fontWeight: 500 }}>
                        {result.description}
                    </div>
                </div>

                {/* Footer Brand */}
                <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: 24, color: '#9ca3af' }}>
                    Ski MBTI by Lok
                </div>
            </div>
        ),
        {
            width: 1080,
            height: 1920,
            fonts: [
                {
                    name: 'NotoSansKR',
                    data: fontData,
                    style: 'normal',
                },
            ],
        }
    );
}
