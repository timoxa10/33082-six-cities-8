import { ChangeEvent } from 'react';

interface InputProps {
  id: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Input({ id, onChange }: InputProps): JSX.Element {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        id={`${id}-stars`}
        type="radio"
        value={id}
        onChange={onChange}
      />
      <label
        htmlFor={`${id}-stars`}
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
