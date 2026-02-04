// src/components/ResultsList.tsx
import type { CheckAnswersResponseDto, QuizState } from '../types/trivia';

export function ResultsList({ quiz, result }: { quiz: QuizState; result: CheckAnswersResponseDto }) {
    return (
        <div className="list-group">
            {quiz.questions.map((q, idx) => {
                const user = quiz.answersByQuestionId[q.questionId];
                const r = result.resultsByQuestionId[q.questionId];
                const correct = r?.correct ?? false;
                const correctAnswer = r?.correctAnswer ?? '';

                return (
                    <div className="list-group-item" key={q.questionId}>
                        <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
                            <div className="d-flex flex-column">
                                <div className="small text-body-secondary">Q{idx + 1} • {q.category} • {q.difficulty}</div>
                                <div className="fw-semibold">{q.question}</div>
                            </div>

                            <span className={`badge ${correct ? 'text-bg-success' : 'text-bg-danger'}`}>
                {correct ? 'Correct' : 'Wrong'}
              </span>
                        </div>

                        <div className="mt-2 small">
                            <div>
                                Your answer: <b>{user ?? '(no answer)'}</b>
                            </div>
                            {!correct && (
                                <div>
                                    Correct answer: <b>{correctAnswer}</b>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
