/**
 * AnswerGrid - Grid layout for answer buttons with Kahoot-style color cycling.
 */
import { AnswerButton } from './AnswerButton';

type Props = {
    type: string;
    answers: string[];
    selectedAnswer?: string;
    onSelect: (answer: string) => void;
};

// Kahoot-inspired color pattern for answer buttons
const kahootVariantCycle = ['danger', 'primary', 'warning', 'success'] as const;

export function AnswerGrid({ type, answers, selectedAnswer, onSelect }: Props) {
    const cols = type === 'boolean' ? 'row-cols-1 row-cols-md-2' : 'row-cols-1 row-cols-md-2';

    return (
        <div className={`row ${cols} g-3`}>
            {answers.map((answer, answerIndex) => (
                <div className="col" key={`${answer}-${answerIndex}`}>
                    <AnswerButton
                        label={answer}
                        variant={kahootVariantCycle[answerIndex % kahootVariantCycle.length]}
                        selected={selectedAnswer === answer}
                        onClick={() => onSelect(answer)}
                    />
                </div>
            ))}
        </div>
    );
}
