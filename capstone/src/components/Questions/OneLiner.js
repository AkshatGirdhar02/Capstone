import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from "react-router-dom";
import '../../App.css'
import PieChart from "../Charts/PieChart";
import BarChart from "../Charts/Barchart";


const OneWord = () => {
    const location = useLocation();
  const username = new URLSearchParams(location.search).get('username');
  
  const navigate = useNavigate();
  const [oneWordQuestion, setOneWordQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [answerFeedback, setAnswerFeedback] = useState('');
  const [userScore, setUserScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(5);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [easy, setEasy] = useState(0);
  const [med, setMed] = useState(0);
  const [hard, setHard] = useState(0)

  const saveQuizData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/saveQuizData', {
        username: username,  // Replace with the actual username or retrieve it from user authentication
        score: userScore,
        quesType:"OneLiner"
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error saving quiz data', error.message);
    }
    navigate("/home")
  };

  const goback = () => {
    navigate('/home');
  };

  useEffect(() => {
    console.log('Fetching OneWord question...');

    // Fetch a random OneWord question from the API
    axios.get('http://127.0.0.1:5001/random_question?type=OneLiner')
      .then((response) => {
        console.log('OneWord question response:', response.data);
        setOneWordQuestion(response.data);
      })
      .catch((error) => {
        console.error('Error fetching OneWord question', error);
      });
  }, []);

const handleCheckAnswer = (difficulty_category) => {
    const trimmedUserAnswer = userAnswer.trim().toLowerCase();
    const trimmedCorrectAnswer = oneWordQuestion.answer.trim().toLowerCase();
    if (trimmedUserAnswer === trimmedCorrectAnswer) {
      setAnswerFeedback('Correct answer!');
      setUserScore(userScore + 1);
      if (difficulty_category === "easy") setEasy(easy + 1);
      if (difficulty_category === "medium") setMed(med + 1);
      if (difficulty_category === "hard") setHard(hard + 1);
    } else {
      setAnswerFeedback(`Wrong answer. Correct answer is: ${oneWordQuestion.answer}`);
    }
  
    setIsAnswerChecked(true);
    setIsNextButtonDisabled(false);
  };
  
  

  const handleNextQuestion = () => {
    if (totalQuestions === 0) {
      setOneWordQuestion(null); // No more questions to fetch
    } else {
      axios.get('http://127.0.0.1:5001/random_question?type=OneLiner')
        .then((response) => {
          setOneWordQuestion(response.data);
          // Clear the user's answer and answer feedback, and enable the input field
          setUserAnswer('');
          setAnswerFeedback('');
          setIsAnswerChecked(false);
          setIsNextButtonDisabled(true); // Disable the "Next" button again
          setTotalQuestions(totalQuestions - 1);
        })
        .catch((error) => {
          console.error('Error fetching OneWord question', error);
        });
    }
  };
  
const handleSpeechRecognition = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.continuous = false;
      recognition.interimResults = false;
  
      recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        setUserAnswer(result);
      };
  
      recognition.onend = () => {
        recognition.stop();
      };
  
      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

return (
    <div>
      {oneWordQuestion ? (
        <div>
          <h2>OneWord Question</h2>
          <h3>{oneWordQuestion.difficulty_category}</h3>
          <p>{oneWordQuestion.question}</p>
          <input
            type="text"
            placeholder="Enter your answer"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={isAnswerChecked}
          />
          <button onClick={()=>handleCheckAnswer(oneWordQuestion.difficulty_category)}>Check Answer</button>
          <button onClick={handleNextQuestion} disabled={isNextButtonDisabled}>Next</button>
          <button onClick={handleSpeechRecognition}>Speech Input</button>
          <p>Score: {userScore}</p>
          {answerFeedback && <p>{answerFeedback}</p>}
        </div>
      ) : (
        totalQuestions === 0 ? (
           <div>
                <h1>{username}! Here's Your Score:</h1>
              <h2>Quiz is Over! Total Score is: {userScore}</h2>
              <h2>Easy: {easy} Med: {med} Hard: {hard}</h2>
              <div>
              <h1>Progess Graphs</h1>
                <PieChart
                  data={[
                    ["Progress", "% of correct answer"],
                    ["Easy", easy],
                    ["Medium", med],
                    ["Hard", hard],
                  ]}
                />
                <BarChart
                  data={[
                    ["Difficulty Level", "total No of questions"],
                    ["Easy", easy],
                    ["Medium", med],
                    ["Hard", hard],
                  ]}
                />
              </div>
                <button onClick={saveQuizData}>Save Quiz Data</button>
              <button onClick={goback}>Go Back to Main Menu</button>
            </div>
        ) : (
          <p>Loading...</p>
        )
      )}
    </div>
  );
        }  

export default OneWord;