import React from "react";
import { EmailText } from "../../shared/inputs/EmailText";
import { NameText } from "../../shared/inputs/Name";
import { PasswordText } from "../../shared/inputs/PasswordText";
import { UsernameText } from "../../shared/inputs/Username";
import { Link } from "react-router-dom";
import "../../styles/auth.css";
import "../../styles/button.css";
export const Signup = () => {
  return (
    <div className='form__container screen'>
      <div className='form__heading'>
        <h3>Signup To Alliance Chat</h3>
      </div>
      <div className='form'>
        <form className='form__body port'>
          <div className='error-message'>
            <div className='message'></div>
          </div>
          <NameText />
          <UsernameText />
          <EmailText />
          <PasswordText />
          <button className='btn btn--contained2-primary mg-none'>
            Signup
          </button>
          <div className='form__else'>
            <p>
              Already have an Account? <Link to='/'>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
