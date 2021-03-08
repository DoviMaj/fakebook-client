type UserType = {
  _id: string;
  picture_url: string;
  username: string;
  friends: Array<UserType>;
  friendsRequestsSent: Array<UserType>;
  friendsRequestsRecieved: Array<UserType>;
};

type PostType = {
  _id: string;
  text: string;
  User: {
    _id: string;
    picture_url: string;
    username: string;
    text: string;
  };
  likes: number;
  comments: Array<{
    User: UserType;
    text: string;
    likes: number;
    date: string;
    _id: string;
  }>;
  date: string;
};
