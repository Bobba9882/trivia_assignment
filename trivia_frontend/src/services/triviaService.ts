// src/services/triviaService.ts
import type {
    CheckAnswersRequestDto,
    CheckAnswersResponseDto,
    GetQuestionsParams,
    QuestionsResponseDto,
} from '../types/trivia';

const BASE_URL = 'http://localhost:8080';

async function parseOrThrow(res: Response): Promise<any> {
    const contentType = res.headers.get('content-type') ?? '';
    const isJson = contentType.includes('application/json');
    const body = isJson ? await res.json().catch(() => null) : await res.text().catch(() => null);

    if (!res.ok) {
        const message =
            (typeof body === 'object' && body && 'message' in body && (body as any).message) ||
            (typeof body === 'string' && body.trim().length ? body : undefined) ||
            `Request failed (${res.status})`;
        throw new Error(message);
    }
    return body;
}

function buildQuestionsUrl(params?: GetQuestionsParams): string {
    const url = new URL('/api/trivia/questions', BASE_URL);
    if (params?.amount !== undefined) url.searchParams.set('amount', String(params.amount));
    if (params?.category !== undefined) url.searchParams.set('category', String(params.category));
    if (params?.difficulty) url.searchParams.set('difficulty', params.difficulty);
    if (params?.type) url.searchParams.set('type', params.type);
    return url.toString();
}

export async function getQuestions(params?: GetQuestionsParams): Promise<QuestionsResponseDto> {
    const res = await fetch(buildQuestionsUrl(params), { method: 'GET', headers: { Accept: 'application/json' } });
    return (await parseOrThrow(res)) as QuestionsResponseDto;
}

export async function checkAnswers(payload: CheckAnswersRequestDto): Promise<CheckAnswersResponseDto> {
    const res = await fetch(`${BASE_URL}/api/trivia/checkanswers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
    });
    return (await parseOrThrow(res)) as CheckAnswersResponseDto;
}

export const triviaService = { getQuestions, checkAnswers };
