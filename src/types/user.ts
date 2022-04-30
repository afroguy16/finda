export type UserT = {
  id: number;
  login: string;
  avatar_url: string;
  type: string;
};

export type UsersPayloadT = {
  total_count: number;
  incomplete_results: boolean;
  items: UserT[];
};
