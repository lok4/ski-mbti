import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-noto-sans-kr",
  display: "optional",
});

export const metadata: Metadata = {
  title: "스키 MBTI 테스트 | 우리 아이에게 딱 맞는 스키 강습은?",
  description: "우리 아이 성향으로 알아보는 스키 강습 스타일 추천! 용감한 북극곰? 신중한 펭귄? 지금 바로 확인해보세요.",
  openGraph: {
    title: "스키 MBTI 테스트",
    description: "우리 아이 성향으로 알아보는 스키 강습 스타일 추천!",
    type: "website",
    locale: "ko_KR",
    // images: ["/og-image.png"], // Placeholder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={cn(
          notoSansKr.variable,
          "font-sans antialiased min-h-screen bg-background text-foreground"
        )}
      >
        <MantineProvider>
          <main className="min-h-screen bg-background text-foreground font-sans antialiased">
            {children}
            <Analytics />
            <SpeedInsights />
          </main>
        </MantineProvider>
      </body>
    </html>
  );
}
