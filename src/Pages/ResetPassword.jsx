import { useState } from "react";
import Loading from "./Loading";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const [isSent, setIsSent] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { resetPassword, loading, setLoading } = useAuth();

  const submitForm = async (data) => {
    try {
      setLoading(true);
      await resetPassword(data.email);
      setIsSent(true)
    } catch {}
    setLoading(false);
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <p className="title">Reset password </p>
        <p className="message">
          Enter your email and we will send you an email to reset your password
        </p>
        <label>
          <input {...register("email")} type="email" className="input" />
          <span>Email</span>
          {errors.email && <p className="error">{errors.email.message}</p>}
        </label>
        <button className="submit">Reset</button>
        <p className="signin">
          Did you remember your password ? <Link to="/login">sign in</Link>{" "}
        </p>
        {isSent && (
          <div className="overlay-message">
            <p className="message">
              We have sent you an email to reset your password, please check
              your inbox <Link to="/login">back to login</Link>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
