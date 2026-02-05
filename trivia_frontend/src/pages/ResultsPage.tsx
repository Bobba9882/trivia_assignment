/**
 * ResultsPage - Displays quiz results with score summary and
 * detailed breakdown of correct/incorrect answers.
 */
import type { CheckAnswersResponseDto, QuizState } from '../types/trivia';
import { AppLayout } from '../components/AppLayout';
import { ResultsList } from '../components/ResultsList';

type Props = {
    quiz: QuizState;
    result: CheckAnswersResponseDto;
    onRestart: () => void;
};

export function ResultsPage({ quiz, result, onRestart }: Props) {
    const total = quiz.questions.length;

    return (
        <AppLayout>
            <div className="d-flex justify-content-center">
                <div className="card shadow-sm" style={{ maxWidth: 900, width: '100%' }}>
                    <div className="card-body p-4">
                        <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between mb-3">
                            <div>
                                <h1 className="h3 mb-1">Results</h1>
                                <div className="text-body-secondary">
                                    Score: <b>{result.correctCount}</b> / <b>{total}</b> (submitted {result.submittedCount})
                                </div>
                            </div>
                            <button className="btn btn-primary" onClick={onRestart}>
                                New quiz
                            </button>
                        </div>

                        <ResultsList quiz={quiz} result={result} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
