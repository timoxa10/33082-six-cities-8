import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, ChangeEvent, SyntheticEvent } from 'react';
import { getCurrentOfferId } from 'store/app-data/selectors';
import { getSendedCommentStatus } from 'store/app-data-status/selectors';
import { DataStatus } from 'config/data-status';
import type { CommentData } from 'types/comment-data';
import { addComment } from 'store/api-actions';
import Input from 'components/input/input';

function ReviewPageForm(): JSX.Element {
  const currentOfferId = useSelector(getCurrentOfferId);
  const loadingStatus = useSelector(getSendedCommentStatus);

  const dispatch = useDispatch();

  const onSubmit = (data: CommentData, id: number) => {
    dispatch(addComment(data, id));
  };

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

  useEffect(() => {
    if (loadingStatus === DataStatus.NotSended) {
      setRating(0);
      setComment('');
    }
  }, [loadingStatus]);

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
      data-testid="reviews-form"
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div
        className={classNames('reviews__rating-form form__rating', {
          'page-form-disable ': loadingStatus === DataStatus.IsSending,
        })}
      >
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
        readOnly={loadingStatus === DataStatus.IsSending}
        onChange={({ target }: ChangeEvent<HTMLTextAreaElement>) => {
          const text = target.value;
          setComment(text);
          setIsDisabled(rating === 0 || text.length < 50 || text.length > 300);
        }}
      />
      {loadingStatus === DataStatus.NotLoaded && (
        <p className="reviews__text">
          Failed to send message. Please, try again.
        </p>
      )}
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

export default ReviewPageForm;
