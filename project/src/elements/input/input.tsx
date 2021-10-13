import { ChangeEvent } from 'react';

interface InputProps {
  id: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Input({ id, onChange }: InputProps): JSX.Element {
  const number = id + 1;
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        id={`${number}-stars`}
        type="radio"
        value={number}
        onChange={onChange}
      />
      <label
        htmlFor={`${number}-stars`}
        className="reviews__rating-label form__rating-label"
        title="perfect"
      >
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </>
  );
}

export default Input;
