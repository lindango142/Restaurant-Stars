import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    navigate('/main');
  };

  return (
    <div className="signInBox">
      <p id="signInTitle">Sign in</p>
        <form className="signInForm">
          <label for='username' className="signInP">Username</label>
          <input className="signInInput" id='username' name="username" type="text" placeholder="username"></input>
          <label for='password' className="signInP">Password</label>
          <input className="signInInput" id="password" name="password" type="password" placeholder="password"></input>
          <button onClick={handleSubmit} type="submit">Sign in</button>
        </form>
    </div>
  )
}

export default Login;