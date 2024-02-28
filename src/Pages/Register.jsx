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
  firstName: yup.string().min(3).required(),
  lastName: yup.string().min(3).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(15).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { signUp, currentUser, loading, setLoading } = useAuth();
  const navigate = useNavigate();

  const submitForm = async (data) => {
    if (!avatar) return;
    try {
      const displayName = data.firstName + " " + data.lastName;
      setLoading(true);
      await signUp(data.email, data.password, avatar, displayName);
      navigate("/");
    } catch (error) {
      console.log("error: ", error);
      setError(true);
    }
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container" onSubmit={handleSubmit(submitForm)}>
      <form className="form">
        <p className="title">Register </p>
        <p className="message">Sign up now and get full access to our app. </p>
        {error && (
          <p className="error">
            email is existing ! <Link to="/login">signin</Link>
          </p>
        )}
        <div className="flex">
          <label>
            <input {...register("firstName")} type="text" className="input" />
            <span>First name</span>
            {errors.firstName && (
              <p className="error">{errors.firstName.message}</p>
            )}
          </label>

          <label>
            <input {...register("lastName")} type="text" className="input" />
            <span>Last name</span>
            {errors.lastName && (
              <p className="error">{errors.lastName.message}</p>
            )}
          </label>
        </div>

        <label>
          <input {...register("email")} type="text" className="input" />
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
        <label>
          <input
            {...register("confirmPassword")}
            type={showPassword ? "text" : "password"}
            className="input"
          />
          <span>Confirm password</span>
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}
        </label>
        <label>
          <input
            onChange={(e) => {
              setAvatar(e.target.files[0]);
            }}
            required={true}
            type="file"
            className="inputAvatar"
          />
          <span>
            <LuImagePlus />
            Add an avatar
          </span>
          {errors.avatar && <p className="error">{errors.avatar.message}</p>}
        </label>
        <button className="submit">Sign up</button>
        <p className="signin">
          Already have an account ? <Link to="/login">Signin</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Register;
