import React, { useEffect, useState } from 'react';
import { fetchQuestions, markTiming, Question } from '../services/api';
import QuestionSet from '../components/QuestionSet';
import { useNavigate } from 'react-router-dom';
import { markCompleteSession } from '../services/api';


interface Props {
  userId: string;
  onAnswer: () => void;
}

const SurveyC: React.FC<Props> = ({ userId, onAnswer }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions('C', userId).then(setQuestions);
    markTiming(userId, 'C', 'enterTime');
  }, [userId]);
  
  const handleComplete = async () => {
    await markTiming(userId, 'C', 'exitTime');
    await markCompleteSession(userId);
    navigate('/thank-you');
  };
  
  
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Survey Set C Personality</h1>
      {questions.length ? (
        <QuestionSet
          setId="C"
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

export default SurveyC;
