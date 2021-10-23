type UserProps = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
};

interface ReviewListProps {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: UserProps;
}

export type { ReviewListProps };
