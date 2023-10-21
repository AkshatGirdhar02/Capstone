// QuizHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import BarChart from './Charts/Barchart';

function Result() {
    const location = useLocation();
    const username = new URLSearchParams(location.search).get('username');
  const [quizHistory, setQuizHistory] = useState([]);

  useEffect(() => {
    const fetchQuizHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user_quiz_data/${username}`);
        setQuizHistory(response.data);
      } catch (error) {
        console.error('Error fetching quiz history', error.message);
      }
    };

    fetchQuizHistory();
  }, [username]);
  
  const barChartData = [['Date', 'Score'], ...quizHistory.map((entry) => [entry.date, entry.score])];
  console.log(barChartData)
  return (
    <div>
      <h2>Quiz History for {username}</h2>
    <BarChart data={barChartData}/>
    </div>
  );
}

export default Result;
