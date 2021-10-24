import type { ReviewProps } from 'types/review-list-props';
import convertDateToString from 'utils/convertDateToString';

type ReviewsItemProps = {
  review: ReviewProps;
};

function ReviewsListItem({ review }: ReviewsItemProps): JSX.Element {
  return (
    <>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={
              review?.user?.avatarUrl
                ? review?.user?.avatarUrl
                : 'img/avatar.svg'
            }
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: '80%' }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={review.date}>
          {convertDateToString(review.date)}
        </time>
      </div>
    </>
  );
}

export default ReviewsListItem;
