import { useMemo, useState } from 'react';
import type { CheckAnswersResponseDto, QuizState } from '../types/trivia';
import { checkAnswers } from '../services/triviaService';
import { AppLayout } from '../components/AppLayout';
import { QuizHeader } from '../components/QuizHeader';
import { QuestionCard } from '../components/QuestionCard';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { ErrorAlert } from '../components/ErrorAlert';

type Props = {
    quiz: QuizState;
    onQuizChange: (next: QuizState) => void;
    onFinish: (result: CheckAnswersResponseDto) => void;
    onQuit: () => void;
};

export function QuizPage({ quiz, onQuizChange, onFinish, onQuit }: Props) {
    const [index, setIndex] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const total = quiz.questions.length;
    const current = quiz.questions[index];

    const answeredCount = useMemo(
        () => Object.keys(quiz.answersByQuestionId).length,
        [quiz.answersByQuestionId]
    );

    if (!current) {
        return (
            <AppLayout>
                <ErrorAlert message="No questions available." />
                <button className="btn btn-outline-secondary" onClick={onQuit}>
                    Back
                </button>
            </AppLayout>
        );
    }

    const selected = quiz.answersByQuestionId[current.questionId];

    function selectAnswer(answer: string) {
        onQuizChange({
            ...quiz,
            answersByQuestionId: {
                ...quiz.answersByQuestionId,
                [current.questionId]: answer,
            },
        });
    }

    function next() {
        if (index < total - 1) setIndex((previousIndex) => previousIndex + 1);
    }

    function prev() {
        if (index > 0) setIndex((previousIndex) => previousIndex - 1);
    }

    async function finish() {
        setError(null);
        setSubmitting(true);
        try {
            const checkResult = await checkAnswers({
                sessionId: quiz.sessionId,
                answersByQuestionId: quiz.answersByQuestionId,
            });
            onFinish(checkResult);
        } catch (error: any) {
            setError(error?.message ?? 'Failed to submit answers');
        } finally {
            setSubmitting(false);
        }
    }


    async function quit() {
        if (submitting) return;

        setError(null);
        setSubmitting(true);

        // Build a map containing ALL questionIds so backend evicts
        const answersByQuestionId: Record<string, string> = {};
        for (const question of quiz.questions) {
            answersByQuestionId[question.questionId] = quiz.answersByQuestionId[question.questionId] ?? '';
        }

        try {
            await checkAnswers({
                sessionId: quiz.sessionId,
                answersByQuestionId,
            });
        } catch {

        } finally {
            setSubmitting(false);
            onQuit();
        }
    }

    const isLast = index === total - 1;
    const allAnswered = answeredCount >= total;

    return (
        <AppLayout fullHeight>
            {submitting && <LoadingOverlay label="Submitting..." />}

            <div className="d-flex flex-column gap-3">
                <QuizHeader
                    category={current.category}
                    difficulty={current.difficulty}
                    index={index}
                    total={total}
                    answeredCount={answeredCount}
                    onQuit={quit}   // <-- changed
                />

                {error && <ErrorAlert message={error} />}

                <QuestionCard
                    question={current}
                    selectedAnswer={selected}
                    onSelectAnswer={selectAnswer}
                />

                <div className="d-flex gap-2 justify-content-between">
                    <button
                        className="btn btn-outline-secondary"
                        onClick={prev}
                        disabled={index === 0 || submitting}
                    >
                        Back
                    </button>

                    <div className="d-flex gap-2">
                        {!isLast && (
                            <button
                                className="btn btn-primary"
                                onClick={next}
                                disabled={!selected || submitting}
                            >
                                Next
                            </button>
                        )}

                        {isLast && (
                            <button
                                className="btn btn-success"
                                onClick={finish}
                                disabled={!allAnswered || submitting}
                            >
                                Finish
                            </button>
                        )}
                    </div>
                </div>

                {!allAnswered && (
                    <div className="text-body-secondary small">
                        Answer all questions to enable <b>Finish</b>.
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
