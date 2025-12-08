"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuizStore } from "@/store/useQuizStore";
import { QUESTIONS } from "@/constants/quiz";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

export default function QuizContainer() {
    const { currentStep, setAnswer, nextStep, calculateResult, isFinished } = useQuizStore();
    const router = useRouter();

    const currentQuestion = QUESTIONS[currentStep];
    const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

    useEffect(() => {
        if (isFinished) {
            calculateResult();
            router.push("/result");
        }
    }, [isFinished, calculateResult, router]);

    if (!currentQuestion || isFinished) return null;

    const handleOptionClick = (optionId: string) => {
        setAnswer(currentQuestion.id, optionId);
        nextStep();
    };

    return (
        <div className="w-full max-w-md mx-auto px-4 py-8 flex flex-col min-h-[80vh] justify-center">
            <div className="mb-8 space-y-2">
                <div className="flex justify-between text-sm text-gray-500 font-medium">
                    <span>Question {currentStep + 1}</span>
                    <span>{QUESTIONS.length}</span>
                </div>
                <Progress value={progress} className="h-3" />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                >
                    <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                        {currentQuestion.text}
                    </h2>

                    <div className="space-y-3">
                        {currentQuestion.options.map((option) => (
                            <motion.div
                                key={option.id}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full justify-start text-left h-auto py-4 px-6 text-base whitespace-normal border-2 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all"
                                    onClick={() => handleOptionClick(option.id)}
                                >
                                    {option.text}
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
