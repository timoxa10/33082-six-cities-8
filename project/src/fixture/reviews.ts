/* eslint-disable camelcase */
import type { ReviewListProps } from 'types/review-list-props';
import camelcaseKeys from 'camelcase-keys';

const initialReviewList = [
  {
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: '2019-05-08T14:13:56.569Z',
    id: 1,
    rating: 4,
    user: {
      avatar_url: 'img/avatar-max.jpg',
      id: 4,
      is_pro: false,
      name: 'Max',
    },
  },
  {
    comment: 'Great location and stuff!',
    date: '2019-05-08T14:13:56.569Z',
    id: 2,
    rating: 3,
    user: {
      avatar_url: 'img/avatar-angelina.jpg',
      id: 4,
      is_pro: false,
      name: 'Ann',
    },
  },
  {
    comment: 'good value for money, affordable price and good breakfast',
    date: '2019-05-08T14:13:56.569Z',
    id: 3,
    rating: 4,
    user: {
      avatar_url: 'img/avatar-angelina.jpg',
      id: 4,
      is_pro: false,
      name: 'John',
    },
  },
];

const ReviewsList: ReviewListProps[] = camelcaseKeys(initialReviewList, {
  deep: true,
});

export default ReviewsList;
