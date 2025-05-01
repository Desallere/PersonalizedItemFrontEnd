import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import { Question } from '../services/api';
import { logAnswer } from '../services/api';

interface Props {
    setId: string;
    questions: Question[];
    userId: string;
    onComplete: () => void;
    onAnswer: () => void;
  }
  
  const QuestionSet: React.FC<Props> = ({ setId, questions, userId, onComplete, onAnswer }) => {
    const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  
    const handleSelect = (questionId: string, optionId: string) => {
      const alreadyAnswered = answers.hasOwnProperty(questionId);
      setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
      logAnswer(userId, setId, questionId, optionId);
      if (!alreadyAnswered) {
        onAnswer(); // only increment if newly answered
      }
    };
  
    const answeredCount = Object.keys(answers).length;
    const allAnswered = questions.length > 0 && answeredCount === questions.length;
  
    return (
      <div className="pt-4">
        {questions.map((q) => (
          <QuestionCard
            key={q.questionId}
            text={q.text}
            options={q.options}
            selected={answers[q.questionId]}
            onSelect={(optId) => handleSelect(q.questionId, optId)}
          />
        ))}
  
        {allAnswered && (
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={onComplete}>
              {setId === 'C' ? 'Finish' : 'Next'}
            </button>
          </div>
        )}
      </div>
    );
  };
  

export default QuestionSet;
