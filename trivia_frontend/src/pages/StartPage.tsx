/**
 * StartPage - Quiz configuration screen where users select settings
 * (amount, difficulty, type, category) before beginning the quiz.
 */
import {useState} from 'react';
import type {GetQuestionsParams, QuestionsResponseDto} from '../types/trivia';
import {getQuestions} from '../services/triviaService';
import {AppLayout} from '../components/AppLayout';
import {LoadingOverlay} from '../components/LoadingOverlay';
import {ErrorAlert} from '../components/ErrorAlert';
import {TRIVIA_CATEGORIES} from '../types/categories';

type Props = {
    initialParams: GetQuestionsParams;
    onStart: (questions: QuestionsResponseDto) => void;
};

export function StartPage({initialParams, onStart}: Props) {
    const [params, setParams] = useState<GetQuestionsParams>(initialParams);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleStart() {
        setError(null);
        setLoading(true);
        try {
            const questionsResponse = await getQuestions(params);
            onStart(questionsResponse);
        } catch (error: any) {
            setError(error?.message ?? 'Failed to start quiz');
        } finally {
            setLoading(false);
        }
    }

    return (
        <AppLayout>
            {loading && <LoadingOverlay label="Loading questions..."/>}
            <div className="card shadow-sm mx-auto" style={{width: '100%'}}>
                <div className="card-body p-4">
                    <h1 className="h3 mb-2">Trivia</h1>
                    <p className="text-body-secondary mb-4">Trivia time! Select your settings and
                        start!</p>

                    {error && <ErrorAlert message={error}/>}

                    <div className="row g-3">
                        <div className="col-12 col-md-4">
                            <label className="form-label">Amount</label>
                            <input
                                className="form-control"
                                type="number"
                                min={1}
                                max={50}
                                value={params.amount ?? 10}
                                onChange={(e) => setParams((previousParams) => ({
                                    ...previousParams,
                                    amount: Number(e.target.value)
                                }))}
                            />
                        </div>

                        <div className="col-12 col-md-4">
                            <label className="form-label">Difficulty</label>
                            <select
                                className="form-select"
                                value={params.difficulty ?? ''}
                                onChange={(e) => setParams((previousParams) => ({
                                    ...previousParams,
                                    difficulty: e.target.value || undefined
                                }))}
                            >
                                <option value="">Any</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>

                        <div className="col-12 col-md-4">
                            <label className="form-label">Type</label>
                            <select
                                className="form-select"
                                value={params.type ?? ''}
                                onChange={(e) => setParams((previousParams) => ({
                                    ...previousParams,
                                    type: e.target.value || undefined
                                }))}
                            >
                                <option value="">Any</option>
                                <option value="multiple">Multiple choice</option>
                                <option value="boolean">True / False</option>
                            </select>
                        </div>

                        <div className="col-12 col-md-6">
                            <label className="form-label">Category (optional)</label>
                            <div className="col-12 col-md-6">
                                <label className="form-label">Category</label>
                                <select
                                    className="form-select"
                                    value={params.category ?? ''}
                                    onChange={(e) =>
                                        setParams((previousParams) => ({
                                            ...previousParams,
                                            category: e.target.value ? Number(e.target.value) : undefined,
                                        }))
                                    }
                                >
                                    <option value="">Any category</option>
                                    {TRIVIA_CATEGORIES.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-text">Leave empty for random categories.</div>
                        </div>

                        <div className="col-12 col-md-6 d-flex align-items-end">
                            <button className="btn btn-primary w-100" onClick={handleStart} disabled={loading}>
                                Start
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
