import React from "react";

export const NameText = () => {
  return (
    <div className='form__control'>
      <div className='form__unit'>
        <input
          name='name'
          type='text'
          className='form__input'
          placeholder=''
          autoComplete='off'
        ></input>
        <label for='name' className='form__label'>
          Name
        </label>
      </div>
    </div>
  );
};
