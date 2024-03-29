import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, } from "react-router-dom";
import QuestionNavigation from "./QuestionNavigation"; // Import the QuestionNavigation component

function MCQ() {
  const navigate=useNavigate();
  const location = useLocation();
  const type = new URLSearchParams(location.search).get('type');
  const difficulty = new URLSearchParams(location.search).get('difficulty');
  const username = new URLSearchParams(location.search).get('username');
  const [question_bank, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(10).fill(null)); // Initialize answers with 15 null values
  const [selectedAnswer, setSelectedAnswer] = useState(null); // State to track the selected answer

  const questions = async () => {
    const response = await axios.get(`http://127.0.0.1:5001/random_question?type=${type}&difficulty=${difficulty}`);
    setQuestions(response.data);
    console.log(response.data)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < 14) {
      // Store the selected answer before moving to the next question
      if (selectedAnswer !== null) {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestion] = selectedAnswer;
        setAnswers(updatedAnswers);
        setSelectedAnswer(null); // Clear the selected answer
      }
      setCurrentQuestion(currentQuestion + 1);
    }
  }
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  const handleAnswerSubmit = (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = answer;
    setAnswers(updatedAnswers);
    console.log(updatedAnswers)
    // handleNextQuestion(); // Automatically go to the next question
    setSelectedAnswer(answer); // Highlight the selected answer

  }

  const handleQuizSubmit = () => {
    console.log("answers",answers)
    navigate(`/ScorePage?username=${username}&type=${type}`,{state:answers})    
  }

  const answerButtonStyle = {
    selected: {
      backgroundColor: "black",
      color: "white",
    },
    unselected: {
      backgroundColor: "blue", // Change this to the default background color
      color: "white", // Change this to the default text color
    },
  };

  useEffect(() => {
    questions();
  }, [type, difficulty]);

  if (question_bank.length === 0) {
    return <p>Loading...</p>;
  }

  const currentQuestionData = question_bank[currentQuestion];
  return (
    <div>
      <h3>Question {currentQuestion + 1}</h3>
      <p>{currentQuestionData.question}</p>

      {/* Add some margin between the question and the buttons */}
      <div style={{ marginBottom: "80px" }}>
        <button
          style={
            answers[currentQuestion] === "A" ? answerButtonStyle.selected : answerButtonStyle.unselected
          }
          onClick={() => handleAnswerSubmit("A")}
        >
          {currentQuestionData.A}
        </button>
        <button
          style={
            answers[currentQuestion] === "B" ? answerButtonStyle.selected : answerButtonStyle.unselected
          }
          onClick={() => handleAnswerSubmit("B")}
        >
          {currentQuestionData.B}
        </button>
        <button
          style={
            answers[currentQuestion] === "C" ? answerButtonStyle.selected : answerButtonStyle.unselected
          }
          onClick={() => handleAnswerSubmit("C")}
        >
          {currentQuestionData.C}
        </button>
        <button
          style={
            answers[currentQuestion] === "D" ? answerButtonStyle.selected : answerButtonStyle.unselected
          }
          onClick={() => handleAnswerSubmit("D")}
        >
          {currentQuestionData.D}
        </button>
      </div>

      {/* Add some margin between the question and the navigation panel */}
      <div style={{ marginBottom: "20px" }}>
        <QuestionNavigation
          totalQuestions={question_bank.length}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          selectedAnswers={answers}
        />
      </div>



      {/* Add some margin between the question and the Previous/Next buttons */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePreviousQuestion}>Previous Question</button>
        <button onClick={handleNextQuestion}>Next Question</button>
      </div>
      {currentQuestion === 9 && (
        <button onClick={handleQuizSubmit}>Submit Quiz</button>
      )}
    </div>
  );
}
export default MCQ;
