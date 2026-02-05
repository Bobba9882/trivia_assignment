/**
 * QuestionCard - Displays a single question with its answer options.
 */
import type { QuestionDto } from '../types/trivia';
import { AnswerGrid } from './AnswerGrid';

type Props = {
    question: QuestionDto;
    selectedAnswer?: string;
    onSelectAnswer: (answer: string) => void;
};

export function QuestionCard({ question, selectedAnswer, onSelectAnswer }: Props) {
    return (
        <div className="card shadow-sm">
            <div className="card-body p-4">
                <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                    <div>
                        <div className="badge text-bg-secondary mb-2">{question.type === 'boolean' ? 'True / False' : 'Multiple choice'}</div>
                        <h2 className="h4 mb-0">{question.question}</h2>
                    </div>
                </div>

                <AnswerGrid
                    type={question.type}
                    answers={question.answers}
                    selectedAnswer={selectedAnswer}
                    onSelect={onSelectAnswer}
                />
            </div>
        </div>
    );
}
