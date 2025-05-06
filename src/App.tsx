import React, { useEffect, useRef, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import SurveyA from './pages/SurveyA';
import SurveyB from './pages/SurveyB';
import SurveyC from './pages/SurveyC';
import { startSession, fetchQuestions } from './services/api';
import ProgressBar from './components/ProgressBar';

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  /* ------------------------------------------------------------------ */
  /* Local state                                                         */
  /* ------------------------------------------------------------------ */
  const [userId, setUserId] = useState<string | null>(null);
  const [booted, setBooted] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  /* ------------------------------------------------------------------ */
  /* Router helpers                                                      */
  /* ------------------------------------------------------------------ */
  const navigate = useNavigate();
  const location = useLocation();

  /* ------------------------------------------------------------------ */
  /* Strict‑mode guard so startSession() runs only once                  */
  /* ------------------------------------------------------------------ */
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return; // already ran once
    initialized.current = true;

    /* ---------- 1. Start anonymous session ---------- */
    startSession()
      .then((id) => {
        setUserId(id);

        /* ---------- 2. Calculate total questions (A + B + C) ---------- */
        return Promise.all([fetchQuestions('A'), fetchQuestions('B')]).then(
          ([setA, setB]) => {
            const totalA = setA.length;
            const totalB = setB.length;
            const totalC = totalA; // we assume C == A length
            setTotalCount(totalA + totalB + totalC);
            setBooted(true);

            /* ---------- 3. Force redirect to /survey/a on first load ---------- */
            if (location.pathname !== '/survey/a') {
              navigate('/survey/a', { replace: true });
            }
          }
        );
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('❌ Failed to start session', err);
      });
  }, [location.pathname, navigate]);

  /* ------------------------------------------------------------------ */
  /* Warn user before accidental refresh / close                        */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  /* ------------------------------------------------------------------ */
  /* Answer‑increment callback for QuestionSet                           */
  /* ------------------------------------------------------------------ */
  const handleAnswer = () => setAnsweredCount((prev) => prev + 1);

  /* ------------------------------------------------------------------ */
  /* Loading guard                                                      */
  /* ------------------------------------------------------------------ */
  if (!booted || !userId || totalCount === 0) {
    return <p style={{ padding: '2rem', textAlign: 'center' }}>Starting new session…</p>;
  }

  /* ------------------------------------------------------------------ */
  /* Render                                                              */
  /* ------------------------------------------------------------------ */
  return (
    <>
      <ProgressBar answered={answeredCount} total={totalCount} />

      <Routes>
        <Route
          path="/survey/a"
          element={<SurveyA userId={userId} onAnswer={handleAnswer} />}
        />
        <Route
          path="/survey/b"
          element={<SurveyB userId={userId} onAnswer={handleAnswer} />}
        />
        <Route
          path="/survey/c"
          element={<SurveyC userId={userId} onAnswer={handleAnswer} />}
        />
        <Route
          path="/thank-you"
          element={
            <h2 className="text-center mt-5">Thank you for completing the survey!</h2>
          }
        />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/survey/a" replace />} />
      </Routes>
    </>
  );
}

export default AppWrapper;
