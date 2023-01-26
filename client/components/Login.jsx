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
          <label for='username' class="signInP">Username</label>
          <input class="signInInput" id='username' name="username" type="text" placeholder="username"></input>
          <label for='password' class="signInP">Password</label>
          <input class="signInInput" id="password" name="password" type="password" placeholder="password"></input>
          <button onClick={handleSubmit} type="submit">Sign in</button>
        </form>
    </div>
  )
}

export default Login;