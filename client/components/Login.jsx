import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    navigate('/main');
  };

  return (
    <div class="signInBox">
      <p id="signInTitle">Sign in</p>
        <form class="signInForm">
          <p class="signInP">Username</p>
          <input class="signInInput" name="username" type="text" placeholder="username"></input>
          <p class="signInP">Password</p>
          <input class="signInInput" name="password" type="password"></input>
          <button onClick={handleSubmit} type="submit">Sign in</button>
        </form>
    </div>
  )
}

export default Login;