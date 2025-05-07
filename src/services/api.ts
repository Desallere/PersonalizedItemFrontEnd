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
  const res = await fetch(`${API_BASE}/start`, { method: "POST" });
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
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, setId, questionId, selectedOptionId }),
  });
}

export async function markCompleteSession(userId: string): Promise<void> {
  await fetch(`${API_BASE}/complete?userId=${userId}`, { method: "POST" });
}

export async function markTiming(
  userId: string,
  setId: string,
  field: "enterTime" | "exitTime"
) {
  await fetch(
    `${API_BASE}/mark-timing?userId=${userId}&setId=${setId}&field=${field}`,
    {
      method: "POST",
    }
  );
}

const LIKERT_4 = [
  { optionId: "opt1", text: "Strongly Disagree" },
  { optionId: "opt2", text: "Disagree" },
  { optionId: "opt3", text: "Agree" },
  { optionId: "opt4", text: "Strongly Agree" },
];

export async function fetchQuestions(setId: string, userId?: string): Promise<Question[]> {
  if (setId === 'C' && userId) {
    const res = await fetch(`${API_BASE}/questions/c?userId=${userId}`);
    const data = await res.json();
    return shuffleArray(data.questions);
  }

  if (setId === 'A') {
    const questions = [
      { questionId: 'A1', text: 'am the life of the party.', options: LIKERT_4 },
      { questionId: 'A2', text: 'feel comfortable around people.', options: LIKERT_4 },
      { questionId: 'A3', text: 'start conversations.', options: LIKERT_4 },
      { questionId: 'A4', text: 'talk to a lot of different people at parties.', options: LIKERT_4 },
      { questionId: 'A5', text: 'feel at ease with people.', options: LIKERT_4 },
      { questionId: 'A6', text: 'sympathize with others\' feelings.', options: LIKERT_4 },
      { questionId: 'A7', text: 'have a soft heart.', options: LIKERT_4 },
      { questionId: 'A8', text: 'take time out for others.', options: LIKERT_4 },
      { questionId: 'A9', text: 'feel others\' emotions.', options: LIKERT_4 },
      { questionId: 'A10', text: 'think of others first.', options: LIKERT_4 },
      { questionId: 'A11', text: 'am always prepared.', options: LIKERT_4 },
      { questionId: 'A12', text: 'pay attention to details.', options: LIKERT_4 },
      { questionId: 'A13', text: 'follow a schedule.', options: LIKERT_4 },
      { questionId: 'A14', text: 'am exacting in my work.', options: LIKERT_4 },
      { questionId: 'A15', text: 'do things according to a plan.', options: LIKERT_4 },
      { questionId: 'A16', text: 'get stressed out easily.', options: LIKERT_4 },
      { questionId: 'A17', text: 'worry about things.', options: LIKERT_4 },
      { questionId: 'A18', text: 'am easily disturbed.', options: LIKERT_4 },
      { questionId: 'A19', text: 'get upset easily.', options: LIKERT_4 },
      { questionId: 'A20', text: 'change my mood a lot.', options: LIKERT_4 },
      { questionId: 'A21', text: 'am full of ideas.', options: LIKERT_4 },
      { questionId: 'A22', text: 'catch on to things quickly.', options: LIKERT_4 },
      { questionId: 'A23', text: 'can handle a lot of information.', options: LIKERT_4 },
      { questionId: 'A24', text: 'love to think up new ways of doing things.', options: LIKERT_4 },
      { questionId: 'A25', text: 'have a vivid imagination.', options: LIKERT_4 },
    ];

    // Add "I" to the beginning of each question
    questions.forEach((question) => {
      question.text = 'I ' + question.text;
    });

    return shuffleArray(questions);  // Shuffle the questions
  }

  if (setId === 'B') {
    const questions = [
      { questionId: 'B1', text: 'Would never take things that aren\'t mine.', options: LIKERT_4 },
      { questionId: 'B2', text: 'Would never cheat on my taxes.', options: LIKERT_4 },
      { questionId: 'B3', text: 'Believe there is never an excuse for lying.', options: LIKERT_4 },
      { questionId: 'B4', text: 'Always admit it when I make a mistake.', options: LIKERT_4 },
      { questionId: 'B5', text: 'Rarely talk about sex.', options: LIKERT_4 },
      { questionId: 'B6', text: 'Return extra change when a cashier makes a mistake.', options: LIKERT_4 },
      { questionId: 'B7', text: 'Try to follow the rules.', options: LIKERT_4 },
      { questionId: 'B8', text: 'Easily resist temptations.', options: LIKERT_4 },
      { questionId: 'B9', text: 'Tell the truth.', options: LIKERT_4 },
      { questionId: 'B10', text: 'Rarely overindulge.', options: LIKERT_4 },
      { questionId: 'B11', text: 'Have sometimes had to tell a lie.', options: LIKERT_4 },
      { questionId: 'B12', text: 'Use swear words.', options: LIKERT_4 },
      { questionId: 'B13', text: 'Use flattery to get ahead.', options: LIKERT_4 },
      { questionId: 'B14', text: 'Am not always what I appear to be.', options: LIKERT_4 },
      { questionId: 'B15', text: 'Break rules.', options: LIKERT_4 },
      { questionId: 'B16', text: 'Cheat to get ahead.', options: LIKERT_4 },
      { questionId: 'B17', text: 'Don\'t always practice what I preach.', options: LIKERT_4 },
      { questionId: 'B18', text: 'Misuse power.', options: LIKERT_4 },
      { questionId: 'B19', text: 'Get back at others.', options: LIKERT_4 },
      { questionId: 'B20', text: 'Am likely to show off if I get the chance.', options: LIKERT_4 },
    ];

    // Add "I" to the beginning of each question and lowercase the first letter
    questions.forEach((question) => {
      question.text = 'I ' + question.text.charAt(0).toLowerCase() + question.text.slice(1);
    });

    return shuffleArray(questions);  // Shuffle the questions
  }

  if (setId === 'D') {
    const questions = [
      { questionId: 'D1', text: 'Do you enjoy coding?', options: LIKERT_4 },
      { questionId: 'D2', text: 'Is learning new technologies fun?', options: LIKERT_4 },
      { questionId: 'D3', text: 'Do you feel confident in your programming skills?', options: LIKERT_4 },
      { questionId: 'D4', text: 'Would you recommend programming to others?', options: LIKERT_4 },
      { questionId: 'D5', text: 'Do you prefer working on individual projects?', options: LIKERT_4 },
    ];
    return shuffleArray(questions);
  }

  return [];
}

// Shuffle array function
function shuffleArray(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

