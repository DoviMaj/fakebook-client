import { createContext } from "react";

export type UserType = {
  _id: string;
  picture_url: string;
  username: string;
};

export const userContext = createContext<UserType | undefined>(undefined);
