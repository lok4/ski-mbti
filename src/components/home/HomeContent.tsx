"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Snowflake } from "lucide-react";

interface HomeContentProps {
    participantCount: number;
}

export default function HomeContent({ participantCount }: HomeContentProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center max-w-md mx-auto w-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
            >
                <div className="relative inline-block">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-8 -right-8 text-secondary"
                    >
                        <Snowflake size={48} />
                    </motion.div>
                    <h1 className="text-4xl font-black text-gray-900 leading-tight">
                        우리 아이 스키<br />
                        <span className="text-primary">MBTI</span>는?
                    </h1>
                </div>

                <p className="text-lg text-gray-600 break-keep">
                    설원 위에서 우리 아이는 어떤 동물일까요?<br />
                    성향에 딱 맞는 강습 스타일을 추천해드립니다!
                </p>

                <div className="py-8">
                    <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-white">
                        <Image
                            src="/images/home-main.jpg"
                            alt="Ski MBTI Hero"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                <Link href="/quiz" className="block w-full">
                    <Button size="lg" className="w-full text-lg font-bold h-16 shadow-lg shadow-primary/20 animate-pulse">
                        테스트 시작하기
                    </Button>
                </Link>

                <div className="h-6 flex items-center justify-center">
                    <div className="text-xs text-gray-400 min-w-[120px] text-center transition-opacity duration-300 bg-gray-50/50 rounded-full px-3 py-1">
                        참여자 수: {participantCount.toLocaleString()}명
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
