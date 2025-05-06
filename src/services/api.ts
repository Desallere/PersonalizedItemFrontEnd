const API_BASE = process.env.REACT_APP_API_BASE as string;

export interface Option {
  optionId: string;
  text: string;
}

export interface Question {
  questionId: string;
  text: string;
  options: Option[];
}

export async function startSession(): Promise<string> {
  const res = await fetch(`${API_BASE}/start`, { method: 'POST' });
  const data = await res.json();
  return data.userId;
}

export async function logAnswer(
  userId: string,
  setId: string,
  questionId: string,
  selectedOptionId: string
): Promise<void> {
  await fetch(`${API_BASE}/answer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, setId, questionId, selectedOptionId }),
  });
}

export async function markCompleteSession(userId: string): Promise<void> {
  await fetch(`${API_BASE}/complete?userId=${userId}`, { method: 'POST' });
}

export async function markTiming(userId: string, setId: string, field: 'enterTime' | 'exitTime') {
  await fetch(`${API_BASE}/mark-timing?userId=${userId}&setId=${setId}&field=${field}`, {
    method: 'POST',
  });
}

export async function fetchQuestions(setId: string, userId?: string): Promise<Question[]> {
  if (setId === 'C' && userId) {
    const res = await fetch(`${API_BASE}/questions/c?userId=${userId}`);
    const data = await res.json();
    return data.questions;
  }

  if (setId === 'A') {
    return [ {
        questionId: 'A1',
        text: 'What is 2 + 2?',
        options: [
          { optionId: 'opt1', text: '3' },
          { optionId: 'opt2', text: '4' },
          { optionId: 'opt3', text: '5' },
        ],
      },
      {
        questionId: 'A2',
        text: 'What is 3 + 1?',
        options: [
          { optionId: 'opt1', text: '4' },
          { optionId: 'opt2', text: '5' },
          { optionId: 'opt3', text: '6' },
        ],
      },{
        questionId: 'A3',
        text: 'What is 3 + 1?',
        options: [
          { optionId: 'opt1', text: '4' },
          { optionId: 'opt2', text: '5' },
          { optionId: 'opt3', text: '6' },
        ],
      },{
        questionId: 'A4',
        text: 'What is 2 + 2?',
        options: [
          { optionId: 'opt1', text: '3' },
          { optionId: 'opt2', text: '4' },
          { optionId: 'opt3', text: '5' },
        ],
      },
      {
        questionId: 'A5',
        text: 'What is 3 + 1?',
        options: [
          { optionId: 'opt1', text: '4' },
          { optionId: 'opt2', text: '5' },
          { optionId: 'opt3', text: '6' },
        ],
      },{
        questionId: 'A6',
        text: 'What is 3 + 1?',
        options: [
          { optionId: 'opt1', text: '4' },
          { optionId: 'opt2', text: '5' },
          { optionId: 'opt3', text: '6' },
        ],
      }];
  }

  if (setId === 'B') {
    return [ {
        questionId: 'B1',
        text: 'What color is the sky?',
        options: [
          { optionId: 'opt1', text: 'Red' },
          { optionId: 'opt2', text: 'Blue' },
          { optionId: 'opt3', text: 'Green' },
        ],
      },
      {
        questionId: 'B2',
        text: 'What color is grass?',
        options: [
          { optionId: 'opt1', text: 'Yellow' },
          { optionId: 'opt2', text: 'Green' },
          { optionId: 'opt3', text: 'Blue' },
        ],
      },];
  }

  return [];
}
