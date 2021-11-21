import { image } from 'faker';
import type { OffersProps } from 'types/card-props';
import type { ReviewsProps } from 'types/review-props';
import type { CommentData } from 'types/comment-data';

export const fakeOffers: OffersProps = [
  {
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    previewImage: image.imageUrl(),
    images: new Array(5).fill(null).map(() => image.imageUrl()),
    title: 'Perfectly located Castro',
    isFavorite: false,
    isPremium: true,
    rating: 2,
    type: 'room',
    bedrooms: 1,
    maxAdults: 3,
    price: 203,
    goods: ['Laptop friendly workspace', 'Breakfast', 'Washer'],
    host: {
      id: 25,
      name: 'Angelina',
      isPro: true,
      avatarUrl: image.imageUrl(),
    },
    description: 'Peaceful studio in the most wanted area in town.',
    location: {
      latitude: 48.83861,
      longitude: 2.350499,
      zoom: 16,
    },
    id: 1,
  },
  {
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    previewImage: image.imageUrl(),
    images: new Array(2).fill(null).map(() => image.imageUrl()),
    title: 'Perfectly located Castro',
    isFavorite: false,
    isPremium: true,
    rating: 2,
    type: 'room',
    bedrooms: 1,
    maxAdults: 3,
    price: 203,
    goods: ['Laptop friendly workspace', 'Breakfast', 'Washer'],
    host: {
      id: 25,
      name: 'Angelina',
      isPro: true,
      avatarUrl: image.imageUrl(),
    },
    description: 'Peaceful studio in the most wanted area in town.',
    location: {
      latitude: 48.83861,
      longitude: 2.350499,
      zoom: 16,
    },
    id: 2,
  },
];

export const fakeReviews: ReviewsProps = [
  {
    id: 1,
    user: {
      id: 17,
      isPro: false,
      name: 'Emely',
      avatarUrl: image.imageUrl(),
    },
    rating: 5,
    comment:
      'What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!',
    date: '2021-11-04T14:35:14.013Z',
  },
];

export const userCommentPost: CommentData = {
  rating: 5,
  comment:
    'The house is very good, very happy, hygienic and simple living conditions around it are also very good. I hope to have the opportunity to come back. Thank you.',
};

export const userCommentResponse = [
  {
    id: 1,
    user: {
      id: 11,
      isPro: false,
      name: 'Jack',
      avatarUrl: image.imageUrl(),
    },
    rating: 2,
    comment:
      'What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!',
    date: '2021-11-08T14:35:14.012Z',
  },
  {
    id: 2,
    user: {
      id: 17,
      isPro: false,
      name: 'Emely',
      avatarUrl: image.imageUrl(),
    },
    rating: 4,
    comment:
      'The house is very good, very happy, hygienic and simple living conditions around it are also very good. I hope to have the opportunity to come back. Thank you.',
    date: '2021-11-08T14:35:14.012Z',
  },
  {
    id: 3,
    user: {
      id: 1,
      isPro: false,
      name: 'timoxa9510',
      avatarUrl: image.imageUrl(),
    },
    rating: 5,
    comment:
      'The house is very good, very happy, hygienic and simple living conditions around it are also very good. I hope to have the opportunity to come back. Thank you.',
    date: '2021-11-19T21:55:35.973Z',
  },
];
