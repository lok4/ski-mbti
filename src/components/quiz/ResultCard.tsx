"use client";

import { QuizResult } from "@/types";
import { motion } from "framer-motion";
import { Share2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/store/useQuizStore";
import { useRouter } from "next/navigation";
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
    const [base64Image, setBase64Image] = useState<string>("");

    // Pre-load image as Base64 when component mounts
    // This ensures no network request is needed during html2canvas capture
    // bypassing all CORS and taint issues.
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(result.imageUrl);
                const blob = await response.blob();
                const reader = new FileReader();
                reader.onloadend = () => {
                    setBase64Image(reader.result as string);
                };
                reader.readAsDataURL(blob);
            } catch (e) {
                console.error("Failed to load image", e);
            }
        };
        fetchImage();
    });

    const handleRetry = () => {
        reset();
        router.push("/quiz");
    };

    const handleShare = async () => {
        if (!cardRef.current || !base64Image) return;

        setIsSharing(true);

        try {
            // Generate image from DOM 
            // Since we use Base64 image source, there are no CORS/Tainted Canvas issues
            const canvas = await html2canvas(cardRef.current, {
                useCORS: true,
                scale: 2,
                backgroundColor: "#ffffff",
            } as any);

            canvas.toBlob(async (blob) => {
                if (!blob) {
                    throw new Error("Blob generation failed");
                }

                const file = new File([blob], "ski-mbti-result.png", { type: "image/png" });
                const shareData = {
                    title: `나의 스키 MBTI는 ${result.title}!`,
                    text: result.description,
                    files: [file],
                };

                // Try native sharing
                if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                    await navigator.share(shareData);
                } else {
                    // Fallback to download
                    const link = document.createElement("a");
                    link.download = "ski-mbti-result.png";
                    link.href = canvas.toDataURL("image/png");
                    link.click();
                    alert("이미지가 저장되었습니다! (공유하기가 지원되지 않는 환경)");
                }
            }, "image/png");
        } catch (error) {
            console.error("Failed to generate image", error);
            alert("이미지 생성에 실패했습니다. (브라우저 제한)");
        } finally {
            setIsSharing(false);
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
                    <div className="relative w-48 h-48 mx-auto mb-6 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
                        {/* Render Base64 image if available, otherwise fallback to URL */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={base64Image || result.imageUrl}
                            alt={result.title}
                            className="object-contain w-full h-full"
                            style={{ objectFit: "contain" }}
                            crossOrigin="anonymous"
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
                    data-html2canvas-ignore
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
