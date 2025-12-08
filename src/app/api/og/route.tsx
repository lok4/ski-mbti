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
    // In production, use the deployed URL. In dev, use localhost.
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const host = request.headers.get("host");
    const baseUrl = `${protocol}://${host}`;
    const imageUrl = `${baseUrl}${result.imageUrl}`;

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
                    backgroundImage: "linear-gradient(to bottom right, #e0f2fe, #ffffff)",
                    padding: 40,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f3f4f6",
                        borderRadius: "100%",
                        padding: 20,
                        marginBottom: 20,
                        width: 200,
                        height: 200,
                        overflow: "hidden",
                    }}
                >
                    {/* We use a simple img tag for the server-side generation */}
                    <img
                        src={imageUrl}
                        alt={result.title}
                        width={180}
                        height={180}
                        style={{ objectFit: "contain" }}
                    />
                </div>

                <div style={{ fontSize: 24, color: "#2563EB", fontWeight: 700, marginBottom: 10 }}>
                    우리 아이 스키 성향은
                </div>

                <div style={{ fontSize: 60, fontWeight: 900, color: "#111827", marginBottom: 20, textAlign: "center" }}>
                    {result.title}
                </div>

                <div style={{ display: "flex", gap: 10, marginBottom: 30 }}>
                    {result.tags.map((tag) => (
                        <div key={tag} style={{
                            padding: "8px 20px",
                            backgroundColor: "white",
                            borderRadius: 20,
                            fontSize: 20,
                            color: "#4B5563",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                        }}>
                            {tag}
                        </div>
                    ))}
                </div>

                <div style={{
                    backgroundColor: "#fffbeb",
                    border: "2px solid #fed7aa",
                    borderRadius: 20,
                    padding: "20px 40px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center"
                }}>
                    <div style={{ fontSize: 20, color: "#d97706", fontWeight: "bold", marginBottom: 5 }}>추천 강습 스타일</div>
                    <div style={{ fontSize: 28, fontWeight: "bold", color: "#1f2937" }}>{result.recommendedLesson}</div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
