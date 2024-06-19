import React, { useEffect } from "react";

const QuestionCard = ({
  index,
  question,
  handleAnswer,
  userAnswer,
  correctAnswer,
  showResult,
  handleNextQuestion,
}) => {
  const [disable, setDisable] = React.useState(false);
  const [options, setOptions] = React.useState([]);

  useEffect(() => {
    const answers = [
      ...question.incorrect_answers,
      question.correct_answer,
    ].sort(() => Math.random() - 0.5);
    setOptions(answers);
  }, [question]);

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    const selectedAnswer = e.target.question1.value;
    if (!selectedAnswer) {
      alert("Please select an answer");
      return;
    }
    setDisable(true);
    handleAnswer(selectedAnswer);
  };

  return (
    <div>
      <div className="flex items-center mb-4 gap-2">
        <span>{index}.</span>
        <h2
          className="font-semibold"
          dangerouslySetInnerHTML={{ __html: question.question }}
        />
      </div>
      <form
        className="space-y-4 mb-4 grid grid-cols-2"
        onSubmit={handleAnswerSubmit}
      >
        {options.map((option, index) => (
          <div className="flex items-center">
            <input
              id={`option${index}`}
              name="question1"
              type="radio"
              className="form-radio h-4 w-4 text-blue-600"
              value={option}
            />
            <label
              htmlFor={`option${index}`}
              className="ml-2"
              dangerouslySetInnerHTML={{ __html: option }}
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={disable}
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </form>

      {showResult && (
        <div>
          {userAnswer === correctAnswer ? (
            <p style={{ color: "green" }}>Correct!</p>
          ) : (
            <div className="flex gap-4">
              <p style={{ color: "red" }}>Incorrect! Correct answer:</p>
              <span dangerouslySetInnerHTML={{ __html: correctAnswer }}></span>
            </div>
          )}
          <button
            onClick={() => {
              handleNextQuestion();
              setDisable(false);
            }}
            className="mt-6 bg-black text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
