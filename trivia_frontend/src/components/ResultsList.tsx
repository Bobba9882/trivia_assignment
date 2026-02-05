/**
 * ResultsList - Renders detailed results for each question,
 * showing user answers, correct answers, and pass/fail status.
 */
import type { CheckAnswersResponseDto, QuizState } from '../types/trivia';

export function ResultsList({ quiz, result }: { quiz: QuizState; result: CheckAnswersResponseDto }) {
    return (
        <div className="list-group">
            {quiz.questions.map((question, questionIndex) => {
                const userAnswer = quiz.answersByQuestionId[question.questionId];
                const answerResult = result.resultsByQuestionId[question.questionId];
                const correct = answerResult?.correct ?? false;
                const correctAnswer = answerResult?.correctAnswer ?? '';

                return (
                    <div className="list-group-item" key={question.questionId}>
                        <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
                            <div className="d-flex flex-column">
                                <div className="small text-body-secondary">Q{questionIndex + 1} • {question.category} • {question.difficulty}</div>
                                <div className="fw-semibold">{question.question}</div>
                            </div>

                            <span className={`badge ${correct ? 'text-bg-success' : 'text-bg-danger'}`}>
                {correct ? 'Correct' : 'Wrong'}
              </span>
                        </div>

                        <div className="mt-2 small">
                            <div>
                                Your answer: <b>{userAnswer ?? '(no answer)'}</b>
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
