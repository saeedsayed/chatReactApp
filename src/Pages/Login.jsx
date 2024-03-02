import React, { useEffect, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { FiEye, FiEyeOff } from "react-icons/fi";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(15).required(),
});

const Login = () => {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { signIn, loading, setLoading } = useAuth();
  const navigate = useNavigate();

  const submitForm = async (data) => {
    try {
      await signIn(data.email, data.password);
      navigate("/");
    } catch (error){
      setError(true);
    }
    setLoading(false);
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <p className="title">Login </p>
        <p className="message">Sign in now and get full access to our app. </p>
        <label>
          <input {...register("email")} type="email" className="input" />
          <span>Email</span>
          {errors.email && <p className="error">{errors.email.message}</p>}
        </label>

        <label>
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            className="input"
          />
          <span>Password</span>
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="show-pass"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </div>
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </label>
        <div className="signin">
          <Link to="/forgetPassword">forget password</Link>
        </div>
        {error && <p className="error">email or password incorrect</p>}
        <button className="submit">Sign in</button>
        <p className="signin">
          You don't have an account ? <Link to="/register">Register</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
