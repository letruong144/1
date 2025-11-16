
import React, { useState, useEffect, useCallback } from 'react';
import { QUIZ_DATA } from './constants';
import { UserAnswers } from './types';
import QuestionDisplay from './components/QuestionDisplay';
import ResultsDisplay from './components/ResultsDisplay';

const App: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const handleAnswerSelect = useCallback((questionId: number, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_DATA.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setEndTime(Date.now());
    setShowResults(true);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
    setStartTime(Date.now());
    setEndTime(0);
  };

  if (showResults) {
    const timeTakenInSeconds = Math.round((endTime - startTime) / 1000);
    return <ResultsDisplay questions={QUIZ_DATA} userAnswers={userAnswers} onRestart={handleRestart} timeTaken={timeTakenInSeconds} />;
  }

  const currentQuestion = QUIZ_DATA[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUIZ_DATA.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="w-full max-w-3xl">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-8">
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Question {currentQuestionIndex + 1} of {QUIZ_DATA.length}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                    <QuestionDisplay
                        questionData={currentQuestion}
                        userAnswer={userAnswers[currentQuestion.id]}
                        onAnswerSelect={handleAnswerSelect}
                    />
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 px-8 py-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                    <button
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        className="w-full sm:w-auto px-6 py-2 text-blue-600 dark:text-blue-400 font-semibold rounded-lg border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>
                    {currentQuestionIndex < QUIZ_DATA.length - 1 ? (
                        <button
                            onClick={handleNextQuestion}
                            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-md"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md"
                        >
                            Submit Quiz
                        </button>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default App;
