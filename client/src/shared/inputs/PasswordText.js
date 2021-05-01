import React from "react";

export const PasswordText = () => {
  return (
    <div className='form__control'>
      <div className='form__unit'>
        <input
          name='password'
          type='text'
          className='form__input'
          placeholder=''
          autoComplete='off'
        />
        <label for='password' className='form__label'>
          Password
        </label>
      </div>
    </div>
  );
};
