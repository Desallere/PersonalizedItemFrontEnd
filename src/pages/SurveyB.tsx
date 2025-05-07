import React, { useEffect, useState } from 'react';
import { fetchQuestions, markTiming, Question } from '../services/api';
import QuestionSet from '../components/QuestionSet';
import { useNavigate } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_BASE as string;
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
  
  const handleComplete = async () => {
    markTiming(userId, 'B', 'exitTime');
    
    // Fetch the user data to check their userNumber
    const res = await fetch(`${API_BASE}/user/${userId}`);
    const data = await res.json();
    console.log(data.userNumber);
    // Check if the user's number is odd or even
    if (data.userNumber % 2 !== 0) {
      // If odd, navigate to Survey D
      navigate('/survey/d');
    } else {
      // If even, navigate to Survey C
      navigate('/survey/c');
    }
  };
  
  

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Survey Set B Social Desirability</h1>
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
