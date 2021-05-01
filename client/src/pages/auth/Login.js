import React from "react";
import { EmailText } from "../../shared/inputs/EmailText";
import { PasswordText } from "../../shared/inputs/PasswordText";
import "../../styles/auth.css";
import "../../styles/button.css";
export const Login = () => {
  return (
    <div className='form__container screen'>
      <div className='form__heading'>
        <h3>Login to Alliance Chat</h3>
      </div>
      <div className='form'>
        <form className='form__body port'>
          <div className='error-message'>
            <div className='message'></div>
          </div>
          <EmailText />
          <PasswordText />
          <button className='btn btn--contained2-primary mg-none'>Login</button>
          <div className='form__else'>
            <p>don't have an account</p>
          </div>
        </form>
      </div>
    </div>
  );
};
