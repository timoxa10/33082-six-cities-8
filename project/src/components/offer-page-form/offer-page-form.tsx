import { useState, ChangeEvent } from 'react';
import Input from '../../elements/input/input';

interface Data {
  rating: number;
  message: string;
}

function OfferPageForm(): JSX.Element {
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data: Data = {
    rating,
    message,
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {Array(5)
          .fill(null)
          .map((element, index) => (
            <Input
              key={element}
              id={index}
              onChange={({
                target: { value },
              }: ChangeEvent<HTMLInputElement>) => {
                const checkedElement = value;
                setRating(+checkedElement);
              }}
            />
          ))
          .reverse()}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={message}
        onChange={({ target }: ChangeEvent<HTMLTextAreaElement>) => {
          const text = target.value;
          setMessage(text);
        }}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star"> rating</span> and describe your stay
          with at least
          <b className="reviews__text-amount"> 50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default OfferPageForm;
