/* eslint-disable camelcase */
import type { ReviewsProps } from 'types/review-list-props';
import camelСaseKeys from 'camelcase-keys';

const initialReviewList = [
  {
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: '2020-01-08T14:13:56.569Z',
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
    date: '2018-05-08T14:13:56.569Z',
    id: 2,
    rating: 3,
    user: {
      avatar_url: '',
      id: 4,
      is_pro: false,
      name: 'Ann',
    },
  },
  {
    comment: 'good value for money, affordable price and good breakfast',
    date: '2017-12-08T14:13:56.569Z',
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

const ReviewsList: ReviewsProps = camelСaseKeys(initialReviewList, {
  deep: true,
});

export default ReviewsList;
