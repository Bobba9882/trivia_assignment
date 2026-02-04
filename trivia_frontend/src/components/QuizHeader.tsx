// src/components/QuizHeader.tsx
type Props = {
    category: string;
    difficulty: string;
    index: number;
    total: number;
    answeredCount: number;
    onQuit: () => void;
};

export function QuizHeader({ category, difficulty, index, total, answeredCount, onQuit }: Props) {
    const progress = Math.round(((index + 1) / total) * 100);

    return (
        <div className="card shadow-sm">
            <div className="card-body py-3">
                <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
                    <div className="d-flex flex-column">
                        <div className="small text-body-secondary">
                            {category} • {difficulty}
                        </div>
                        <div className="fw-semibold">
                            Question {index + 1} / {total} <span className="text-body-secondary fw-normal">• answered {answeredCount}</span>
                        </div>
                    </div>

                    <button className="btn btn-outline-danger btn-sm" onClick={onQuit}>
                        Quit
                    </button>
                </div>

                <div className="progress mt-3" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar" style={{ width: `${progress}%` }} />
                </div>
            </div>
        </div>
    );
}
