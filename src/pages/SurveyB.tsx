import React, { useEffect, useState } from 'react';
import { fetchQuestions, markTiming, Question } from '../services/api';
import QuestionSet from '../components/QuestionSet';
import { useNavigate } from 'react-router-dom';

interface Props {
  userId: string;
  onAnswer: () => void;
}

const SurveyB: React.FC<Props> = ({ userId, onAnswer }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions('B').then(setQuestions);
    markTiming(userId, 'B', 'enterTime');
  }, [userId]);
  
  const handleComplete = () => {
    markTiming(userId, 'B', 'exitTime');
    navigate('/survey/c');
  };
  

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Survey Set B</h1>
      {questions.length ? (
        <QuestionSet
          setId="B"
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

export default SurveyB;
