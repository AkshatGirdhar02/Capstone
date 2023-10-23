import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function MCQ() {
  const location = useLocation();
  const type = new URLSearchParams(location.search).get('type');
  const difficulty = new URLSearchParams(location.search).get('difficulty');
  const username = new URLSearchParams(location.search).get('username');
  const [question_bank, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(15).fill(null)); // Initialize answers with 15 null values

  const questions = async () => {
    const response = await axios.get(`http://127.0.0.1:5001/random_question?type=${type}&difficulty=${difficulty}`);
    setQuestions(response.data);
    console.log(response.data)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < 14) {
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
    handleNextQuestion(); // Automatically go to the next question
  }

  const handleQuizSubmit = () => {
    // Send the answers to the backend for checking
    axios.post("http://127.0.0.1:5001/check_answers", {answers})
      .then(response => {
        // Handle the response from the backend
        console.log("Answers checked:", response.data);
      })
      .catch(error => {
        // Handle any errors that may occur during the request
        console.error("Error checking answers:", error);
      });
  }

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
      <button onClick={() => handleAnswerSubmit("A")}>{currentQuestionData.A}</button>
      <button onClick={() => handleAnswerSubmit("B")}>{currentQuestionData.B}</button>
      <button onClick={() => handleAnswerSubmit("C")}>{currentQuestionData.C}</button>
      <button onClick={() => handleAnswerSubmit("D")}>{currentQuestionData.D}</button>
      <div>
        <button onClick={handlePreviousQuestion}>Previous Question</button>
        <button onClick={handleNextQuestion}>Next Question</button>
      </div>
      {currentQuestion === 14 && (
        <button onClick={handleQuizSubmit}>Submit Quiz</button>
      )}
    </div>
  );
}

export default MCQ;
