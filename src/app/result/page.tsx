"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/store/useQuizStore";
import ResultCard from "@/components/quiz/ResultCard";
import LeadForm from "@/components/leads/LeadForm";
import { Loader2 } from "lucide-react";

export default function ResultPage() {
    const { result, isFinished } = useQuizStore();
    const router = useRouter();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (isHydrated && !result) {
            router.replace("/");
        }
    }, [result, isHydrated, router]);

    if (!isHydrated || !result) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-warm-white py-8 px-4">
            <div className="max-w-md mx-auto space-y-8">
                <ResultCard result={result} />
                <LeadForm resultType={result.type} />
            </div>
        </div>
    );
}
