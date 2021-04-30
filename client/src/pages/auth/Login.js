import React from "react";
import { EmailText } from "../../shared/inputs/EmailText";
import { PasswordText } from "../../shared/inputs/PasswordText";
export const Login = () => {
  return (
    <div className='form__container screen'>
      <div className='form__heading'>
        <h3>Login to Alliance Chat</h3>
      </div>
      <div className='form'>
        <form className='form__body port'>
          <div className='error-message'>
            <div className='message'>error</div>
          </div>
          <EmailText />
          <PasswordText />
        </form>
        <div className='form_else'>
          <p>don't have an account</p>
        </div>
      </div>
    </div>
  );
};
