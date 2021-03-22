type UserType = {
  _id: string;
  picture_url: string;
  username: string;
  friends: UserType[];
  friendsRequestsSent: UserType[];
  friendsRequestsRecieved: UserType[];
};

type PostType = {
  _id: string;
  text?: string;
  image_url?: string;
  User: {
    _id: string;
    picture_url: string;
    username: string;
    text: string;
  };
  likes: number;
  comments: {
    User: UserType;
    text: string;
    likes: number;
    date: string;
    _id: string;
  }[];
  date: string;
};

type ChatType = {
  from: string;
  msg: string;
}[];
