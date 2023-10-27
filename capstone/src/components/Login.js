import "../App.css"; // Import the CSS file
import { useAuth0 } from "@auth0/auth0-react";

import React from "react";

function Login() {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  console.log("Current user: ", user);
  const handleLogin = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      console.log("I am logged in !!");
      window.location.replace("http://localhost:3000/login");
    }
  };
  return (
    <div>
      {isAuthenticated ? (
        <button onClick={(e) => logout()}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login with Redirect</button>
      )}
    </div>
  );
}

export default Login;