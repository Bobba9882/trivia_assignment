export interface QuestionDto {
    questionId: string;
    type: string;
    difficulty: string;
    category: string;
    question: string;
    answers: string[];
}

export interface QuestionsResponseDto {
    sessionId: string;
    questions: QuestionDto[];
}

export interface CheckAnswersRequestDto {
    sessionId: string;
    answersByQuestionId: Record<string, string>;
}

export interface AnswerResultDto {
    correct: boolean;
    correctAnswer: string;
}

export interface CheckAnswersResponseDto {
    resultsByQuestionId: Record<string, AnswerResultDto>;
    correctCount: number;
    submittedCount: number;
}

export type AnswersByQuestionId = Record<string, string>;

export interface GetQuestionsParams {
    amount?: number;
    category?: number;
    difficulty?: string;
    type?: string;
}


export interface QuizState {
    sessionId: string;
    questions: QuestionDto[];
    answersByQuestionId: AnswersByQuestionId;
}
