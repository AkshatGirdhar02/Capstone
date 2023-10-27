import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"; // Import useAuth0
import '../App.css'; // Import the CSS file

function Home({ username }) {
  const navigate = useNavigate();
  const { logout, user } = useAuth0();

  const handleButton = (type) => {
    if (type === "Result") navigate(`/Result?username=${username}`, { replace: true });
    else navigate(`/Difficulty?type=${type}&username=${username}`)
  }
 

  return (
    <div className="center">
      <div className="home-container">
        <h1>Welcome {username}</h1>
        <h1>PLACE ME ASSIST</h1>
        <h3>Revising concepts made easy!</h3>
        <p>
          {/* Your lorem ipsum text */}
        </p>
        <button onClick={() => handleButton("Result")}>SHOW PAST RESULTS</button>
        <button onClick={() => handleButton("MCQ")}>MCQs</button>
        <button onClick={() => handleButton("TrueFalse")}>True False</button>
        <button onClick={() => handleButton("OneLiner")}>One Liners</button>
        <button onClick={() => handleButton("OneWord")}>One Word</button>
        <button onClick={() => handleButton("Random")}>Random</button>
        {/* Add a Logout button */}
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  );
}

export default Home;
