import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { RESULTS } from "@/constants/quiz";

export const runtime = "edge";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const character = searchParams.get("character");

    // Default to a fallback if not found
    const result = character && RESULTS[character] ? RESULTS[character] : RESULTS["BRAVE_POLAR_BEAR"];

    // Use absolute URL for image source
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const host = request.headers.get("host");
    const baseUrl = `${protocol}://${host}`;
    const imageUrl = `${baseUrl}${result.imageUrl}`;

    // Fetch the image as ArrayBuffer for Satori
    // This avoids Satori trying to fetch from the URL itself, which can be flaky in some environments
    const imageBuffer = await fetch(imageUrl).then((res) => {
        if (!res.ok) throw new Error(`Failed to load image: ${imageUrl}`);
        return res.arrayBuffer();
    });

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

                {/* Main Title */}
                <div style={{ fontSize: 96, fontWeight: 900, color: "#111827", marginBottom: 40, textAlign: "center" }}>
                    {result.title}
                </div>

                {/* Tags */}
                <div style={{ display: "flex", gap: 20, marginBottom: 80, flexWrap: "wrap", justifyContent: "center" }}>
                    {result.tags.map((tag) => (
                        <div key={tag} style={{
                            padding: "16px 40px",
                            backgroundColor: "white",
                            borderRadius: 50,
                            fontSize: 36,
                            color: "#4B5563",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                        }}>
                            {tag}
                        </div>
                    ))}
                </div>

                {/* Recommendation Box */}
                <div style={{
                    backgroundColor: "#fff7ed", // Warm orange background
                    border: "4px solid #fed7aa",
                    borderRadius: 40,
                    padding: "40px 60px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    width: "100%",
                    maxWidth: 900,
                }}>
                    <div style={{ fontSize: 42, color: "#d97706", fontWeight: "bold", marginBottom: 15 }}>추천 강습 스타일</div>
                    <div style={{ fontSize: 52, fontWeight: "bold", color: "#1f2937", lineHeight: 1.3 }}>{result.recommendedLesson}</div>
                </div>

                {/* Branding Footer */}
                <div style={{ position: "absolute", bottom: 60, fontSize: 32, color: "#9ca3af", fontWeight: 500 }}>
                    Ski MBTI by Lok
                </div>
            </div>
        ),
        {
            width: 1080,
            height: 1920,
        }
    );
}
