const transformRatingToPersent = (rating: number | undefined): string =>
  !rating ? '' : `${(Math.round(rating) * 100) / 5}%`;

export default transformRatingToPersent;
