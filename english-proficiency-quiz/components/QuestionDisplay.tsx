
import React from 'react';
import { Question } from '../types';

interface QuestionDisplayProps {
  questionData: Question;
  userAnswer?: string;
  onAnswerSelect: (questionId: number, answer: string) => void;
}

const Option: React.FC<{
  optionKey: string;
  text: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ optionKey, text, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200
        ${isSelected
          ? 'bg-blue-500 border-blue-600 text-white shadow-lg'
          : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
        }
      `}
    >
      <div className={`
        w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center mr-4 font-bold
        ${isSelected ? 'bg-white text-blue-500' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}
      `}>
        {optionKey}
      </div>
      <span className="text-lg">{text}</span>
    </div>
  );
};

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ questionData, userAnswer, onAnswerSelect }) => {
  return (
    <div className="w-full text-gray-800 dark:text-gray-200">
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-500 dark:text-blue-400 mb-1">{questionData.section}</p>
        <h2 className="text-2xl md:text-3xl font-bold leading-tight">
          Question {questionData.id}: {questionData.question}
        </h2>
      </div>
      <div className="space-y-4">
        {Object.entries(questionData.options).map(([key, value]) => (
          <Option
            key={key}
            optionKey={key}
            text={value}
            isSelected={userAnswer === key}
            onClick={() => onAnswerSelect(questionData.id, key)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionDisplay;
