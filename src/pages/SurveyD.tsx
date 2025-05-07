import React, { useEffect, useState } from 'react';
import { fetchQuestions, markTiming, Question } from '../services/api';
import QuestionSet from '../components/QuestionSet';
import { useNavigate } from 'react-router-dom';
import { markCompleteSession } from '../services/api';

interface Props {
  userId: string;
  onAnswer: () => void;
}

const SurveyD: React.FC<Props> = ({ userId, onAnswer }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions('D', userId).then(setQuestions);
    markTiming(userId, 'D', 'enterTime');
  }, [userId]);

  const handleComplete = async () => {
    await markTiming(userId, 'D', 'exitTime');
    await markCompleteSession(userId);
    navigate('/thank-you');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Survey Set D</h1>
      {questions.length ? (
        <QuestionSet
          setId="D"
          questions={questions}
          userId={userId}
          onComplete={handleComplete}
          onAnswer={onAnswer}
        />
      ) : (
        <div className="text-center">Loading questions...</div>
      )}
    </div>
  );
};

export default SurveyD;
