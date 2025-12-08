export type PersonalityType = 'BRAVE_POLAR_BEAR' | 'CAREFUL_PENGUIN' | 'SPEEDY_CHEETAH' | 'SOCIAL_DOLPHIN';

export interface AnswerOption {
    id: string;
    text: string;
    value: PersonalityType; // Which type this answer leans towards
}

export interface Question {
    id: number;
    text: string;
    options: AnswerOption[];
}

export interface QuizResult {
    type: PersonalityType;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    recommendedLesson: string;
}

export interface LeadFormData {
    name: string;
    phone: string;
    resultType: PersonalityType;
}

export interface QuizState {
    currentStep: number;
    answers: Record<number, string>; // questionId -> answerId
    isFinished: boolean;
    result: QuizResult | null;
}
