import { create } from "zustand";
import { persist } from "zustand/middleware";
import { QuizState, PersonalityType } from "@/types";
import { QUESTIONS, RESULTS } from "@/constants/quiz";
import { calculatePersonality } from "@/lib/algorithm";

interface QuizStore extends QuizState {
    setAnswer: (questionId: number, answerId: string) => void;
    nextStep: () => void;
    prevStep: () => void;
    reset: () => void;
    calculateResult: () => void;
}

export const useQuizStore = create<QuizStore>()(
    persist(
        (set, get) => ({
            currentStep: 0,
            answers: {},
            isFinished: false,
            result: null,

            setAnswer: (questionId, answerId) =>
                set((state) => ({
                    answers: { ...state.answers, [questionId]: answerId },
                })),

            nextStep: () =>
                set((state) => {
                    const nextStep = state.currentStep + 1;
                    if (nextStep >= QUESTIONS.length) {
                        // If it was the last question, mark as finished
                        return { isFinished: true };
                    }
                    return { currentStep: nextStep };
                }),

            prevStep: () =>
                set((state) => ({
                    currentStep: Math.max(0, state.currentStep - 1),
                    isFinished: false,
                })),

            reset: () =>
                set({
                    currentStep: 0,
                    answers: {},
                    isFinished: false,
                    result: null,
                }),

            calculateResult: () => {
                const { answers } = get();
                const resultType = calculatePersonality(answers, QUESTIONS);
                set({ result: RESULTS[resultType] });
            },
        }),
        {
            name: "ski-mbti-storage",
        }
    )
);
