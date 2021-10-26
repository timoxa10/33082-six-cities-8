type UserProps = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
};

interface ReviewProps {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: UserProps;
}

type ReviewsProps = ReviewProps[];

export type { ReviewProps, ReviewsProps };
