import React from "react";
import { EmailText } from "../../shared/inputs/EmailText";
import { PasswordText } from "../../shared/inputs/PasswordText";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../styles/auth.css";
import "../../styles/button.css";
import { useHttpClient } from "../../shared/hooks/http-hooks";
export const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const { isLoading, error, sendRequest } = useHttpClient();
  const handleLogin = async (data) => {
    try {
      const responseData = await sendRequest(
        "/api/users/login",
        "POST",
        JSON.stringify({ ...data }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      console.log(err, error);
    }
  };
  const onSubmit = (data) => {
    handleLogin(data);
  };
  return (
    <div className='form__container screen' onSubmit={handleSubmit(onSubmit)}>
      <div className='form__heading'>
        <h3>Login to Alliance Chat</h3>
      </div>
      <div className='form'>
        <form className='form__body port'>
          <div className='error-message'>
            <div className='message'>
              {error ? error || "something went wrong ..." : " "}
            </div>
          </div>
          <EmailText register={register} errors={errors} />
          <PasswordText register={register} errors={errors} />
          <button
            disabled={isLoading}
            className='btn btn--contained2-primary mg-none'
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
          <div className='form__else'>
            <p>
              don't have an account? <Link to='/signup'>Signup</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
