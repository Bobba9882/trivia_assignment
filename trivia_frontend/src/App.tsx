/**
 * Root application component that manages navigation between trivia quiz views
 * and maintains global state (quiz data, results, theme).
 */
import { useEffect, useMemo, useState } from 'react';
import type {
    CheckAnswersResponseDto,
    GetQuestionsParams,
    QuestionsResponseDto,
    QuizState,
} from './types/trivia';

import { StartPage } from './pages/StartPage';
import { QuizPage } from './pages/QuizPage';
import { ResultsPage } from './pages/ResultsPage';

type View = 'start' | 'quiz' | 'results';

export default function App() {
    const [view, setView] = useState<View>('start');
    const [quiz, setQuiz] = useState<QuizState | null>(null);
    const [result, setResult] = useState<CheckAnswersResponseDto | null>(null);
    const [darkMode, setDarkMode] = useState(true);

    // Default quiz parameters (memoized to prevent recreation)
    const initialParams = useMemo<GetQuestionsParams>(() => ({ amount: 10 }), []);

    // Sync Bootstrap theme with darkMode state
    useEffect(() => {
        document.documentElement.setAttribute(
            'data-bs-theme',
            darkMode ? 'dark' : 'light'
        );
    }, [darkMode]);

    return (
        <>
            <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 2000 }}>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="themeSwitch"
                        checked={darkMode}
                        onChange={() => setDarkMode((previousValue) => !previousValue)}
                    />
                    <label className="form-check-label" htmlFor="themeSwitch">
                        Dark mode
                    </label>
                </div>
            </div>

            {view === 'start' && (
                <StartPage
                    initialParams={initialParams}
                    onStart={(questionsResponse: QuestionsResponseDto) => {
                        setQuiz({
                            sessionId: questionsResponse.sessionId,
                            questions: questionsResponse.questions,
                            answersByQuestionId: {},
                        });
                        setResult(null);
                        setView('quiz');
                    }}
                />
            )}

            {view === 'quiz' && quiz && (
                <QuizPage
                    quiz={quiz}
                    onQuizChange={setQuiz}
                    onFinish={(checkResult) => {
                        setResult(checkResult);
                        setView('results');
                    }}
                    onQuit={() => {
                        setQuiz(null);
                        setResult(null);
                        setView('start');
                    }}
                />
            )}

            {view === 'results' && quiz && result && (
                <ResultsPage
                    quiz={quiz}
                    result={result}
                    onRestart={() => {
                        setQuiz(null);
                        setResult(null);
                        setView('start');
                    }}
                />
            )}
        </>
    );
}
