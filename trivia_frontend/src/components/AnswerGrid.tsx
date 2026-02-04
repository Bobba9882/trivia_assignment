// src/components/AnswerGrid.tsx
import { AnswerButton } from './AnswerButton';

type Props = {
    type: string; // 'boolean' | 'multiple' (backend sends string)
    answers: string[];
    selectedAnswer?: string;
    onSelect: (answer: string) => void;
};

const kahootVariantCycle = ['danger', 'primary', 'warning', 'success'] as const;

export function AnswerGrid({ type, answers, selectedAnswer, onSelect }: Props) {
    const cols = type === 'boolean' ? 'row-cols-1 row-cols-md-2' : 'row-cols-1 row-cols-md-2';

    return (
        <div className={`row ${cols} g-3`}>
            {answers.map((a, i) => (
                <div className="col" key={`${a}-${i}`}>
                    <AnswerButton
                        label={a}
                        variant={kahootVariantCycle[i % kahootVariantCycle.length]}
                        selected={selectedAnswer === a}
                        onClick={() => onSelect(a)}
                    />
                </div>
            ))}
        </div>
    );
}
