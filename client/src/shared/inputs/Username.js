import React from "react";

export const UsernameText = () => {
  return (
    <div className='form__control'>
      <div className='form__unit'>
        <input
          name='username'
          type='text'
          className='form__input'
          placeholder=''
          autoComplete='off'
        ></input>
        <label for='username' className='form__label'>
          Username
        </label>
      </div>
    </div>
  );
};
