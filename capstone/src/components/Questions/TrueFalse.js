import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import '../../App.css'
import PieChart from "../Charts/PieChart";
import BarChart from "../Charts/Barchart";

function TrueFalse() {
  const location = useLocation();
  const username = new URLSearchParams(location.search).get('username');
  
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [totalques, setTotalQues] = useState(15);
  const [easy, setEasy] = useState(0);
  const [med, setMed] = useState(0);
  const [hard, setHard] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [answerSelected, setAnswerSelected] = useState(false);


  const saveQuizData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/saveQuizData', {
        username: username,  // Replace with the actual username or retrieve it from user authentication
        score: score,
        quesType:"TrueFalse"
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

  const checkAns = (ans, difficulty_category) => {
    if (answerSelected) {
      return; // Do nothing if an answer has already been selected
    }

    setAnswerSelected(true); // Set answerSelected to true to disable further clicking

    if (questions.answer === ans) {
      setScore(score + 1);
      if (difficulty_category === "easy") setEasy(easy + 1);
      if (difficulty_category === "medium") setMed(med + 1);
      if (difficulty_category === "hard") setHard(hard + 1);
    }

    setSelectedAnswer(ans);
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
      const response = await axios.get('http://localhost:5001/random_question?type=TrueFalse');
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
                  backgroundColor: selectedAnswer === true ? (questions.answer ? 'green' : 'red') : '',
                }}
                onClick={() => checkAns(true, questions.difficulty_category)}
              >
                True
              </button>
              <button
                disabled={answerSelected}
                style={{
                  backgroundColor: selectedAnswer === false ? (questions.answer ? 'red' : 'green') : '',
                }}
                onClick={() => checkAns(false, questions.difficulty_category)}
              >
                False
              </button>
              {correctAnswer !== null && (
                <p>
                  Correct Answer: {correctAnswer ? 'True' : 'False'}
                </p>
              )}
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

export default TrueFalse;
