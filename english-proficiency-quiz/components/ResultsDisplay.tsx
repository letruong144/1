
import React from 'react';
import { Question, UserAnswers } from '../types';

interface ResultsDisplayProps {
  questions: Question[];
  userAnswers: UserAnswers;
  onRestart: () => void;
  timeTaken: number;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ questions, userAnswers, onRestart, timeTaken }) => {
  const score = questions.reduce((acc, question) => {
    return acc + (userAnswers[question.id] === question.answer ? 1 : 0);
  }, 0);

  const percentage = Math.round((score / questions.length) * 100);

  const getResultColor = (userAnswer: string | undefined, correctAnswer: string, optionKey: string) => {
    if (optionKey === correctAnswer) {
      return 'border-green-500 bg-green-100 dark:bg-green-900/50 dark:border-green-700 text-green-800 dark:text-green-300';
    }
    if (userAnswer === optionKey && userAnswer !== correctAnswer) {
      return 'border-red-500 bg-red-100 dark:bg-red-900/50 dark:border-red-700 text-red-800 dark:text-red-300';
    }
    return 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700';
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-2">Quiz Completed!</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">Here's how you performed.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-lg">
                <p className="text-sm font-bold text-blue-500 dark:text-blue-400">SCORE</p>
                <p className="text-3xl font-bold text-blue-800 dark:text-blue-200">{score} / {questions.length}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/50 p-4 rounded-lg">
                <p className="text-sm font-bold text-green-500 dark:text-green-400">ACCURACY</p>
                <p className="text-3xl font-bold text-green-800 dark:text-green-200">{percentage}%</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/50 p-4 rounded-lg">
                <p className="text-sm font-bold text-purple-500 dark:text-purple-400">TIME TAKEN</p>
                <p className="text-3xl font-bold text-purple-800 dark:text-purple-200">{formatTime(timeTaken)}</p>
            </div>
        </div>
        <button
          onClick={onRestart}
          className="mt-8 w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Try Again
        </button>
      </div>

      <div className="space-y-6">
        {questions.map((question) => (
          <div key={question.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <p className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-4">
              {question.id}. {question.question}
            </p>
            <div className="space-y-3">
              {Object.entries(question.options).map(([key, value]) => (
                <div
                  key={key}
                  className={`p-3 border-2 rounded-lg ${getResultColor(userAnswers[question.id], question.answer, key)}`}
                >
                  {key}. {value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;
