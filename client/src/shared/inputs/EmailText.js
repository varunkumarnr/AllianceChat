import React from "react";

export const EmailText = () => {
  return (
    <div className='form__control'>
      <div className='form__unit'>
        <input
          name='email'
          type='text'
          className='form__input'
          placeholder=''
          autoComplete='off'
        ></input>
        <label for='email' className='form__label'>
          email
        </label>
      </div>
    </div>
  );
};
