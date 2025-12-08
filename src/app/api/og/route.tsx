import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { RESULTS } from "@/constants/quiz";

export const runtime = "edge";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const character = searchParams.get("character");

    // Default to a fallback if not found
    const result = character && RESULTS[character] ? RESULTS[character] : RESULTS["BRAVE_POLAR_BEAR"];

    // Determine Base URL
    // specific logic to ensure it works on Vercel preview/production
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const host = request.headers.get("host") || "localhost:3000";
    const baseUrl = `${protocol}://${host}`;

    // 1. Load Font (Fetch from public URL)
    const fontUrl = `${baseUrl}/fonts/NotoSansKR-Bold.ttf`;
    const fontData = await fetch(fontUrl).then((res) => {
        if (!res.ok) throw new Error(`Failed to load font: ${fontUrl} (${res.status})`);
        return res.arrayBuffer();
    }).catch(e => {
        console.error("Font fetch failed:", e);
        return null;
    });

    // 2. Load Image (Fetch from public URL)
    const imageUrl = `${baseUrl}${result.imageUrl}`;
    const imageBuffer = await fetch(imageUrl).then((res) => {
        if (!res.ok) throw new Error(`Failed to load image: ${imageUrl} (${res.status})`);
        return res.arrayBuffer();
    }).catch(e => {
        console.error("Image fetch failed:", e);
        return null;
    });

    if (!fontData) {
        return new Response("Failed to load font", { status: 500 });
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
                    {imageBuffer ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                            src={imageBuffer as any}
                            alt={result.title}
                            width={450}
                            height={450}
                            style={{ objectFit: "contain" }}
                        />
                    ) : (
                        <div style={{ fontSize: 40, color: "#ccc" }}>Img Error</div>
                    )}
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
