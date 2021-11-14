import type { ReviewsProps } from 'types/review-props';
import ReviewsListItem from './reviews-list-item';

type ReviewsListProps = {
  reviews: ReviewsProps;
};

function ReviewsList({ reviews }: ReviewsListProps): JSX.Element {
  const reviewsAmount = !reviews ? 0 : reviews?.length;
  const maxReviewsAmount = 10;
  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviewsAmount}</span>
      </h2>
      <ul className="reviews__list">
        {reviews?.slice(0, maxReviewsAmount)?.map((review) => (
          <li className="reviews__item" key={review.id}>
            <ReviewsListItem review={review} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ReviewsList;
