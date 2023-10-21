// Home.js

import { useNavigate } from "react-router-dom";
import '../App.css'; // Import the CSS file

function Home({ username }) {
  const navigate = useNavigate();

  const handleButton = (type) => {
    if (type === "MCQ") navigate(`/MCQ?username=${username}`, { replace: true });
    if (type === "TrueFalse") navigate(`/TrueFalse?username=${username}`, { replace: true });
    if (type === "OneLiner") navigate(`/OneLiner?username=${username}`, { replace: true });
    if (type === "OneWord") navigate(`/OneWord?username=${username}`, { replace: true });
    if (type === "Random") navigate(`/Random?username=${username}`, { replace: true });
    if (type === "Result") navigate(`/Result?username=${username}`,{replace:true});
  };

  return (
    <div className="center">
      <div className="home-container">
        <h1>Welcome {username}</h1>
        <h1>PLACE ME ASSIST</h1>
        <h3>Revising concepts made easy!</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
        </p>
        <button onClick={()=>handleButton("Result")}>SHOW PAST RESULTS</button>
        <button onClick={() => handleButton("MCQ")}>MCQs </button>
        <button onClick={() => handleButton("TrueFalse")}>True False </button>
        <button onClick={() => handleButton("OneLiner")}>One Liners </button>
        <button onClick={() => handleButton("OneWord")}>One Word </button>
        <button onClick={() => handleButton("Random")}>Random</button>
      </div>
    </div>
  );
}

export default Home;
