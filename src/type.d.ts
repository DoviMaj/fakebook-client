declare global {
  type UserType = {
    _id: string;
    picture_url: string;
    username: string;
  };
  type PostType = {
    post: {
      _id: string;
      text: string;
      User: { _id: string; picture_url: string; username: string; text: string };
      likes: number;
      comments: {
        User: object;
        text: string;
        likes: number;
        date: string;
      };
      date: string;
    };
  };
}

export {};
