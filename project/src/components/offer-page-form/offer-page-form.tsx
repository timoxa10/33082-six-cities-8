import { useState, ChangeEvent, SyntheticEvent } from 'react';
import { ThunkAppDispatch } from 'types/action';
import { connect, ConnectedProps } from 'react-redux';
import type { CommentData } from 'types/comment-data';
import type { State } from 'types/state';
import { addComment } from 'store/api-actions';
import Input from 'elements/input/input';

const mapStateToProps = ({ currentOfferId, isError }: State) => ({
  currentOfferId,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSubmit(data: CommentData, id: number) {
    dispatch(addComment(data, id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function OfferPageForm({
  currentOfferId,
  onSubmit,
}: PropsFromRedux): JSX.Element {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState(true);

  function handleSubmit(evt: SyntheticEvent) {
    evt.preventDefault();

    if (!isDisabled) {
      onSubmit({ comment, rating }, currentOfferId);
    }

    setRating(0);
    setComment('');
  }

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((starCount) => (
          <Input
            key={`rating-star-${starCount}`}
            id={starCount}
            value={starCount}
            onChange={() => setRating(starCount)}
            checked={rating === starCount}
          />
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={({ target }: ChangeEvent<HTMLTextAreaElement>) => {
          const text = target.value;
          setComment(text);
          setIsDisabled(rating === 0 || text.length < 50 || text.length > 300);
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
          disabled={isDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export { OfferPageForm };
export default connector(OfferPageForm);
