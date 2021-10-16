/* eslint-disable camelcase */
import type { CardListProps } from 'types/card-list-props';
import camelcaseKeys from 'camelcase-keys';

const initialCardList = [
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: [
      'Heating',
      'Kitchen',
      'Cable TV',
      'Washing machine',
      'Coffee machine',
      'Dishwasher',
    ],
    host: {
      avatar_url: 'img/1.png',
      id: 3,
      is_pro: true,
      name: 'Angelina',
    },
    id: 1,
    images: ['img/apartment-01.jpg'],
    is_favorite: false,
    is_premium: false,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
    max_adults: 4,
    preview_image: 'img/1.png',
    price: 120,
    rating: 4.8,
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
  },
  {
    bedrooms: 2,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description: 'Condo at great location.',
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine'],
    host: {
      avatar_url: 'img/1.png',
      id: 3,
      is_pro: true,
      name: 'Angelina',
    },
    id: 2,
    images: ['img/apartment-02.jpg'],
    is_favorite: true,
    is_premium: true,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
    max_adults: 4,
    preview_image: 'img/1.png',
    price: 100,
    rating: 4.8,
    title: 'Beautiful & luxurious condo at great location',
    type: 'condo',
  },
  {
    bedrooms: 2,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description: 'Nice, cozy, warm apartment.',
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine'],
    host: {
      avatar_url: 'img/1.png',
      id: 3,
      is_pro: true,
      name: 'Angelina',
    },
    id: 3,
    images: ['img/apartment-03.jpg'],
    is_favorite: true,
    is_premium: false,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
    max_adults: 4,
    preview_image: 'img/1.png',
    price: 180,
    rating: 3.8,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'apartment',
  },
  {
    bedrooms: 2,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description: 'Wood and stone, great location.',
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine'],
    host: {
      avatar_url: 'img/1.png',
      id: 3,
      is_pro: true,
      name: 'Angelina',
    },
    id: 4,
    images: ['img/apartment-01.jpg'],
    is_favorite: true,
    is_premium: true,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
    max_adults: 4,
    preview_image: 'img/1.png',
    price: 80,
    rating: 4.8,
    title: 'Wood and stone place',
    type: 'apartment',
  },
];

const CardList: CardListProps[] = camelcaseKeys(initialCardList, {
  deep: true,
});

export default CardList;