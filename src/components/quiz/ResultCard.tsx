"use client";

import { QuizResult } from "@/types";
import { motion } from "framer-motion";
import { Share2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/store/useQuizStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

interface ResultCardProps {
    result: QuizResult;
}

export default function ResultCard({ result }: ResultCardProps) {
    const { reset } = useQuizStore();
    const router = useRouter();
    const [isSharing, setIsSharing] = useState(false);

    const handleRetry = () => {
        reset();
        router.push("/quiz");
    };

    // ... handleShare logic ...

    // IN RENDER:
    // ...
    <Image
        src={result.imageUrl} // Use original image URL
        alt={result.title}
        fill
        className="object-contain"
        priority
        unoptimized
    />

    const handleShare = async () => {
        setIsSharing(true);

        try {
            // Call our server-side API to generate the image
            const response = await fetch(`/api/og?character=${result.type}`);

            if (!response.ok) {
                throw new Error(`Server Error: ${response.status} ${response.statusText}`);
            }

            const blob = await response.blob();

            if (!blob) throw new Error("이미지 데이터가 비어있습니다.");

            const file = new File([blob], "ski-mbti-result.png", { type: "image/png" });
            const shareData = {
                title: `나의 스키 MBTI는 ${result.title}!`,
                text: result.description,
            };

            // Try native sharing
            if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    console.log("Share cancelled or failed", err);
                }
            } else {
                // Fallback to download
                const link = document.createElement("a");
                link.download = "ski-mbti-result.png";
                link.href = URL.createObjectURL(blob);
                link.click();
                alert("이미지가 저장되었습니다! (공유하기가 지원되지 않는 환경)");
            }
        } catch (error) {
            console.error("Failed to generate image", error);
            alert("이미지 생성에 실패했습니다.");
        } finally {
            setIsSharing(false);
        }
    };

    return (
        <div
            className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
        >
            <div className="bg-secondary/30 p-8 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="relative w-48 h-48 mx-auto mb-6 bg-gray-100 rounded-full overflow-hidden">
                        <Image
                            src={result.imageUrl}
                            alt={result.title}
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <h2 className="text-primary font-bold text-lg tracking-wide mb-2">
                        우리 아이 스키 성향은
                    </h2>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
                        {result.title}
                    </h1>
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {result.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-600 shadow-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>

            <div className="p-8 space-y-6 bg-white">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">성향 분석</h3>
                    <p className="text-gray-600 leading-relaxed">
                        {result.description}
                    </p>
                </div>

                <div className="bg-warm-white p-6 rounded-xl border border-primary/20">
                    <h4 className="font-bold text-primary mb-2">추천 강습 스타일</h4>
                    <p className="text-xl font-bold text-gray-900">
                        {result.recommendedLesson}
                    </p>
                </div>

                <div
                    className="flex gap-3 pt-4"
                >
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={handleRetry}
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        다시하기
                    </Button>
                    <Button
                        variant="secondary"
                        className="flex-1"
                        onClick={handleShare}
                        disabled={isSharing}
                    >
                        <Share2 className="w-4 h-4 mr-2" />
                        {isSharing ? "저장 중..." : "공유하기"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
