import React from "react";
import { LuImagePlus } from "react-icons/lu";

const Login = () => {
  return (
    <div className="container">
      <form className="form">
        <p className="title">Login </p>
        <p className="message">Sign in now and get full access to our app. </p>
        <label>
          <input
            required="true"
            placeholder=""
            type="email"
            className="input"
          />
          <span>Email</span>
        </label>

        <label>
          <input
            required="true"
            placeholder=""
            type="password"
            className="input"
          />
          <span>Password</span>
        </label>
        <button className="submit">Sign in</button>
        <p className="signin">
          You don't have an account ? <a href="#">Register</a>{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
