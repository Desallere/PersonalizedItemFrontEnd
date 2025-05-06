import React, { useRef, useState } from 'react';
import QuestionCard from './QuestionCard';
import { Question } from '../services/api';
import { logAnswer } from '../services/api';

interface Props {
  setId: string;
  questions: Question[];
  userId: string;
  onComplete: () => void;
  onAnswer: () => void;
}

const QuestionSet: React.FC<Props> = ({
  setId,
  questions,
  userId,
  onComplete,
  onAnswer,
}) => {
  /* questionId ➜ selected optionId */
  const [answers, setAnswers] = useState<Record<string, string>>({});

  /* Card refs for auto‑scroll */
  const cardRefs = useRef<HTMLDivElement[]>([]);
  /* Footer ref for scroll when last Q is done */
  const footerRef = useRef<HTMLDivElement>(null);

  /* Handle option click */
  const handleSelect = (
    questionId: string,
    optionId: string,
    idx: number
  ) => {
    const firstTime = !(questionId in answers);

    /* Save locally + log to backend */
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    logAnswer(userId, setId, questionId, optionId);

    /* Update global progress only once */
    if (firstTime) onAnswer();

    /* Scroll to next question or footer */
    const nextCard = cardRefs.current[idx + 1];
    if (nextCard) {
      nextCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      footerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const answeredCount = Object.keys(answers).length;
  const allAnswered = questions.length > 0 && answeredCount === questions.length;

  return (
    <div className="pt-4">
      {/* Render every question */}
      {questions.map((q, idx) => (
        <div
          key={q.questionId}
          ref={(el) => {
            if (el) cardRefs.current[idx] = el;
          }}
        >
          <QuestionCard
            text={q.text}
            options={q.options}
            selected={answers[q.questionId]}
            onSelect={(optId) => handleSelect(q.questionId, optId, idx)}
          />
        </div>
      ))}

      {/* Always show footer button */}
      <div ref={footerRef} className="text-center mt-4">
        <button
          className={`btn ${allAnswered ? 'btn-primary' : 'btn-secondary'}`}
          disabled={!allAnswered}
          onClick={() => allAnswered && onComplete()}
          style={{ minWidth: '120px' }}
        >
          {setId === 'C' ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default QuestionSet;
