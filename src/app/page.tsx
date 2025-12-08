"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Snowflake } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [participantCount, setParticipantCount] = useState<number>(988);

  useEffect(() => {
    const fetchCount = async () => {
      // Base count provided by user requirement
      const BASE_COUNT = 988;

      try {
        const { count, error } = await supabase
          .from("leads")
          .select("*", { count: "exact", head: true });

        if (!error && count !== null) {
          setParticipantCount(BASE_COUNT + count);
        }
      } catch (e) {
        console.error("Failed to fetch count", e);
      }
    };

    fetchCount();
  }, []);

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
          {/* Placeholder for Hero Image */}
          <div className="w-64 h-64 bg-secondary/30 rounded-full mx-auto flex items-center justify-center text-6xl shadow-inner">
            ⛷️
          </div>
        </div>

        <Link href="/quiz" className="block w-full">
          <Button size="lg" className="w-full text-lg font-bold h-16 shadow-lg shadow-primary/20 animate-pulse">
            테스트 시작하기
          </Button>
        </Link>

        <div className="h-4 flex items-center justify-center">
          <p className="text-xs text-gray-400 transition-opacity duration-300">
            참여자 수: {participantCount.toLocaleString()}명
          </p>
        </div>
      </motion.div>
    </div>
  );
}
