import React, { useEffect, useState } from 'react';
import Question from './Question';
import classes from '../modules/Quiz.module.scss'

const quizData = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 'Paris',
  },
  {
    question: 'What is the capital of Georgia?',
    options: ['Berlin', 'Madrid', 'Tbilisi', 'Rome'],
    correctAnswer: 'Tbilisi',
  },
  {
    question: 'What is the capital of Russia?',
    options: ['Berlin', 'Madrid', 'Moscow', 'Rome'],
    correctAnswer: 'Moscow',
  },
  {
    question: 'What is the capital of Italy?',
    options: ['Berlin', 'Madrid', 'Rome', 'Moswoc'],
    correctAnswer: 'Rome',
  },
  {
    question: 'What is the capital of Spain?',
    options: ['Berlin', 'Madrid', 'Tbilisi', 'Rome'],
    correctAnswer: 'Madrid',
  },
];


const timerDuration = 20;

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(timerDuration);

  useEffect(() => {
    let interval;

    if (currentQuestion < quizData.length) {
      setTimer(timerDuration);
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            handleNextQuestion();
          }
          return prevTimer > 0 ? prevTimer - 1 : 0;
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [currentQuestion]);

  const handleAnswerSelect = (answer) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answer);
      if (answer === quizData[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
      clearInterval();
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
  };

  return (
    <div className={classes['quiz-container']}>
      {currentQuestion < quizData.length ? (
        <>
          <Question
            data={quizData[currentQuestion]}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
          />
          <div className={classes['timer']}>Time left: {timer} seconds</div>
        </>
      ) : (
        <div className={classes['quiz-finish']}>
          <h2>Quiz Completed!</h2>
          <p>Your Scored: {score}/{quizData.length}</p>
        </div>
      )}
      {currentQuestion < quizData.length && (
        <button onClick={handleNextQuestion} disabled={selectedAnswer === null}>
          Next Question
        </button>
      )}
    </div>
  );
}

export default Quiz;