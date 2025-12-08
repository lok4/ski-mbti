import { PersonalityType, AnswerOption } from "@/types";
import { RESULTS } from "@/constants/quiz";

export function calculatePersonality(answers: Record<number, string>, questions: { id: number; options: AnswerOption[] }[]): PersonalityType {
    const scores: Record<PersonalityType, number> = {
        BRAVE_POLAR_BEAR: 0,
        CAREFUL_PENGUIN: 0,
        SPEEDY_CHEETAH: 0,
        SOCIAL_DOLPHIN: 0,
    };

    // Iterate through answers
    Object.entries(answers).forEach(([questionId, answerId]) => {
        const question = questions.find((q) => q.id === Number(questionId));
        if (question) {
            const selectedOption = question.options.find((opt) => opt.id === answerId);
            if (selectedOption) {
                scores[selectedOption.value]++;
            }
        }
    });

    // Find the type with the highest score
    let maxScore = -1;
    let resultType: PersonalityType = "BRAVE_POLAR_BEAR"; // Default

    (Object.keys(scores) as PersonalityType[]).forEach((type) => {
        if (scores[type] > maxScore) {
            maxScore = scores[type];
            resultType = type;
        }
    });

    return resultType;
}
