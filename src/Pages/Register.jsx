import React from "react";
import { LuImagePlus } from "react-icons/lu";

const Register = () => {
  return (
    <div className="container">
      <form className="form">
        <p className="title">Register </p>
        <p className="message">Signup now and get full access to our app. </p>
        <div className="flex">
          <label>
            <input
              required="true"
              placeholder=""
              type="text"
              className="input"
            />
            <span>Firstname</span>
          </label>

          <label>
            <input
              required="true"
              placeholder=""
              type="text"
              className="input"
            />
            <span>Lastname</span>
          </label>
        </div>

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
        <label>
          <input
            required="true"
            placeholder=""
            type="password"
            className="input"
          />
          <span>Confirm password</span>
        </label>
        <label>
          <input
            required="true"
            placeholder=""
            type="file"
            className="inputAvatar"
          />
          <span> 
						<LuImagePlus/>
						Add an avatar</span>
        </label>
        <button className="submit">Sign up</button>
        <p className="signin">
          Already have an account ? <a href="#">Signin</a>{" "}
        </p>
      </form>
    </div>
  );
};

export default Register;
