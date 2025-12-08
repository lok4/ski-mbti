"use client";

import { QuizResult } from "@/types";
import { motion } from "framer-motion";
import { Share2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/store/useQuizStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";

interface ResultCardProps {
    result: QuizResult;
}

export default function ResultCard({ result }: ResultCardProps) {
    const { reset } = useQuizStore();
    const router = useRouter();
    const cardRef = useRef<HTMLDivElement>(null);
    const [isSharing, setIsSharing] = useState(false);

    const [imageSrc, setImageSrc] = useState<string>(result.imageUrl);

    // Pre-load image as Blob to bypass CORS for html2canvas
    useEffect(() => {
        const prepareImage = async () => {
            try {
                const response = await fetch(result.imageUrl);
                const blob = await response.blob();
                const objectUrl = URL.createObjectURL(blob);
                setImageSrc(objectUrl);
            } catch (e) {
                console.error("Failed to preload image blob", e);
            }
        };

        prepareImage();
    }, [result.imageUrl]);

    const handleRetry = () => {
        reset();
        router.push("/quiz");
    };

    // ... handleShare logic ...

    // IN RENDER:
    // ...
    <Image
        src={imageSrc} // Use the blob URL
        alt={result.title}
        fill
        className="object-contain"
        priority
        unoptimized
    />

    const handleShare = async () => {
        if (!cardRef.current) return;

        setIsSharing(true);

        try {
            // Generate image from DOM
            const canvas = await html2canvas(cardRef.current, {
                useCORS: true, // Handle cross-origin images
                scale: 2, // Higher quality
                backgroundColor: "#ffffff",
            } as any);

            canvas.toBlob(async (blob) => {
                if (!blob) {
                    setIsSharing(false);
                    return;
                }

                // Create file from blob
                const file = new File([blob], "ski-mbti-result.png", { type: "image/png" });
                const shareData = {
                    title: `나의 스키 MBTI는 ${result.title}!`,
                    text: result.description,
                    files: [file],
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
                    link.href = canvas.toDataURL("image/png");
                    link.click();
                    alert("이미지가 저장되었습니다! (공유하기가 지원되지 않는 환경)");
                }
                setIsSharing(false);
            }, "image/png");
        } catch (error) {
            console.error("Failed to generate image", error);
            setIsSharing(false);
            alert(`이미지 생성 실패: ${error instanceof Error ? error.message : "알 수 없는 오류"}`);
        }
    };

    return (
        <div
            ref={cardRef}
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
                            src={imageSrc}
                            alt={result.title}
                            fill
                            className="object-contain"
                            priority
                            unoptimized // Fix for html2canvas CORS issue
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
                    data-html2canvas-ignore // Do not include buttons in the screenshot
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
