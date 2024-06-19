import React, { useState, useEffect } from "react";
import QuestionCard from "./questionCard";
import fetchQuestion from "./apiservice";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    const newQuestions = await fetchQuestion(10); // Assuming API now fetches 10 questions at once
    console.log(newQuestions, "NEw Questions");
    setQuestions(newQuestions);
  };

  const handleAnswer = (answer) => {
    const correct = questions[currentQuestionIndex].correct_answer === answer;
    setUserAnswer(answer);
    setShowResult(true);
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setUserAnswer(null);
      setShowResult(false);
    } else {
      setGameOver(true);
    }
  };

  return (
    <div className="flex items-center mt-9 ml-9">
      {!gameOver ? (
        questions.length > 0 && (
          <QuestionCard
            index={currentQuestionIndex + 1}
            question={questions[currentQuestionIndex]}
            handleAnswer={handleAnswer}
            userAnswer={userAnswer}
            correctAnswer={questions[currentQuestionIndex].correct_answer}
            showResult={showResult}
            handleNextQuestion={handleNextQuestion}
          />
        )
      ) : (
        <div className="flex flex-col items-center w-full gap-y-10">
          <h1 className="font-bold text-4xl">Game Over! Your score: {score}</h1>
          <p className="font-semibold text-2xl">
            Total Questions: {questions.length}
          </p>
          <p className="text-green-800 font-bold">Correct Answers: {score}</p>
          <p className="text-red-500 font-bold">
            Incorrect Answers: {questions.length - score}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
