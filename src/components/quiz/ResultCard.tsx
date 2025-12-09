"use client";

import { QuizResult } from "@/types";
import { motion } from "framer-motion";
import { Share2, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/store/useQuizStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ResultCardProps {
    result: QuizResult;
}

export default function ResultCard({ result }: ResultCardProps) {
    const { reset } = useQuizStore();
    const router = useRouter();
    const [isSharing, setIsSharing] = useState(false);
    const [canShare, setCanShare] = useState(true); // Default to true to prevent flicker on mobile
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);

    useEffect(() => {
        // Check if native sharing is supported (Mobile usually true, Desktop usually false)
        if (typeof navigator !== 'undefined') {
            setCanShare(!!navigator.share);
        }
    }, []);

    const handleRetry = () => {
        reset();
        router.push("/quiz");
    };

    const handleShare = async () => {
        setIsSharing(true);

        try {
            // Call our server-side API to generate the image
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

            const response = await fetch(`/api/og?character=${result.type}`, {
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`Server Error: ${response.status} ${response.statusText}`);
            }

            const blob = await response.blob();
            if (!blob) throw new Error("이미지 데이터가 비어있습니다.");

            // Convert to Base64 for better compatibility with in-app browsers (KakaoTalk long-press)
            const reader = new FileReader();
            const base64Promise = new Promise<string>((resolve) => {
                reader.onloadend = () => resolve(reader.result as string);
            });
            reader.readAsDataURL(blob);
            const base64Url = await base64Promise;

            const imageUrl = URL.createObjectURL(blob); // Keep blob URL for desktop download
            const file = new File([blob], "ski-mbti-result.png", { type: "image/png" });
            const shareData = {
                title: `나의 스키 MBTI는 ${result.title}!`,
                text: result.description,
                files: [file],
            };

            const openImageModal = () => {
                setModalImageUrl(base64Url); // Use Base64 for the modal
                setIsModalOpen(true);
            };

            const safeDownload = () => {
                // If specific in-app browsers known to block downloads
                const ua = navigator.userAgent || '';
                const isKakao = /KAKAOTALK/i.test(ua);
                const isInstagram = /Instagram/i.test(ua);

                if (isKakao || isInstagram) {
                    openImageModal();
                    return;
                }

                // Default desktop/mobile download
                const link = document.createElement("a");
                link.download = "ski-mbti-result.png";
                link.href = imageUrl;
                document.body.appendChild(link); // Append to body for Firefox support
                link.click();
                document.body.removeChild(link); // Clean up
                alert("이미지가 다운로드 폴더에 저장되었습니다!");
            };

            // Try native sharing
            if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    console.log("Share cancelled or failed", err);
                    // Only fallback to download if it wasn't a user cancellation (AbortError)
                    if (err instanceof Error && err.name !== 'AbortError') {
                        // Fallback to modal for mobile failures
                        openImageModal();
                    }
                }
            } else {
                // Desktop or unsupported browser -> Direct Download
                safeDownload();
            }
        } catch (error) {
            console.error("Failed to generate image", error);
            if (error instanceof Error && error.name === 'AbortError') {
                alert("이미지 생성 시간이 초과되었습니다. 다시 시도해주세요.");
            } else {
                alert(`이미지 생성 실패: ${error instanceof Error ? error.message : "알 수 없는 오류"}`);
            }
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
                    <div className="relative w-48 h-48 mx-auto mb-6 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
                        <Image
                            src={result.imageUrl}
                            alt={result.title}
                            fill
                            className="object-contain"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                        {isSharing ? "저장 중..." : (canShare ? "공유하기" : "이미지 저장")}
                    </Button>
                </div>
            </div>
            {/* Image Save Modal for In-App Browsers */}
            {isModalOpen && modalImageUrl && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4" onClick={() => setIsModalOpen(false)}>
                    <div className="relative w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
                        <Button
                            variant="ghost"
                            className="absolute -top-12 right-0 text-white hover:bg-white/20 rounded-full p-2"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <X className="w-8 h-8" />
                        </Button>
                        <div className="bg-white rounded-2xl overflow-hidden p-2">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={modalImageUrl}
                                alt="Result Card"
                                className="w-full h-auto rounded-xl"
                            />
                        </div>
                        <p className="text-white text-center mt-6 text-lg font-bold animate-pulse">
                            이미지를 꾹 눌러서 저장하세요! 👇
                        </p>
                        <p className="text-gray-400 text-center mt-2 text-sm">
                            카카오톡/인앱 브라우저에서는<br />
                            직접 저장이 제한될 수 있습니다.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
