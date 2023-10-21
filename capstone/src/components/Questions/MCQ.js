import axios from "axios";
import { useEffect, useState } from "react";
import BarChart from "../Charts/Barchart";
import PieChart from "../Charts/PieChart";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function MCQ() {
  
  const navigate = useNavigate();
  const location = useLocation();
  const username = new URLSearchParams(location.search).get('username');
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [totalques, setTotalQues] = useState(15);
  const [easy, setEasy] = useState(0);
  const [med, setMed] = useState(0);
  const [hard, setHard] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [answerSelected, setAnswerSelected] = useState(false);

  const goback = () => {
    navigate('/home');
  };
  const saveQuizData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/saveQuizData', {
        username: username,  
        score: score,
        quesType:"MCQ"
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error saving quiz data', error.message);
    }
    navigate("/home")
  };

  const checkAns = (ans, difficulty_category) => {
    if (answerSelected) {
      return; 
    }

    setAnswerSelected(true); 
    if (questions.answer === ans) {
      setScore(score + 1);
      if (difficulty_category === "easy") setEasy(easy + 1);
      if (difficulty_category === "medium") setMed(med + 1);
      if (difficulty_category === "hard") setHard(hard + 1);
      setSelectedAnswer(ans);
    } else {
      setSelectedAnswer(ans);
    }

    setCorrectAnswer(questions.answer);
    setTotalQues(totalques - 1);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setCorrectAnswer(null);
    setAnswerSelected(false); // Reset answerSelected when moving to the next question
    if (totalques > 0) fetchMCQ();
  };

  const fetchMCQ = async () => {
    try {
      const response = await axios.get('http://localhost:5001/random_question?type=MCQ');
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions", error.message);
    }
  };

  useEffect(() => {
    fetchMCQ();
  }, []);

  return (
    <div>
      <h4>SCORE: {score}</h4>
      <center>
        <ul>
          {totalques > 0 ? (
            <div>
              <h2>{questions.difficulty_category}</h2>
              <h3>{questions.question}</h3>
              <button
                disabled={answerSelected}
                style={{
                  backgroundColor:
                    selectedAnswer === 'A' ? (questions.answer === 'A' ? 'green' : 'red') : '',
                }}
                onClick={() => checkAns('A', questions.difficulty_category)}
              >
                {questions.A}
              </button>
              <button
                disabled={answerSelected}
                style={{
                  backgroundColor:
                    selectedAnswer === 'B' ? (questions.answer === 'B' ? 'green' : 'red') : '',
                }}
                onClick={() => checkAns('B', questions.difficulty_category)}
              >
                {questions.B}
              </button>
              <button
                disabled={answerSelected}
                style={{
                  backgroundColor:
                    selectedAnswer === 'C' ? (questions.answer === 'C' ? 'green' : 'red') : '',
                }}
                onClick={() => checkAns('C', questions.difficulty_category)}
              >
                {questions.C}
              </button>
              <button
                disabled={answerSelected}
                style={{
                  backgroundColor:
                    selectedAnswer === 'D' ? (questions.answer === 'D' ? 'green' : 'red') : '',
                }}
                onClick={() => checkAns('D', questions.difficulty_category)}
              >
                {questions.D}
              </button>
              {correctAnswer && <p>Correct Answer: {correctAnswer}</p>}
              <button onClick={nextQuestion} disabled={!answerSelected}>
                Next
              </button>
            </div>
          ) : (
            <div>
              <h1>{username}! Here's Your Score:</h1>
              <h2>Quiz is Over! Total Score is: {score}</h2>
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
          )}
        </ul>
      </center>
    </div>
  );
}

export default MCQ;
