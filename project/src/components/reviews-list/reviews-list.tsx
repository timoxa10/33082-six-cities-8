import type { ReviewListProps } from 'types/review-list-props';
import ReviewsListItem from './reviews-list-item';

type ReviewsListProps = {
  list: ReviewListProps[];
};

function ReviewsList({ list }: ReviewsListProps): JSX.Element {
  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{list?.length}</span>
      </h2>
      <ul className="reviews__list">
        {list?.map((item) => (
          <ReviewsListItem itemList={item} key={item.id} />
        ))}
      </ul>
    </>
  );
}

export default ReviewsList;
