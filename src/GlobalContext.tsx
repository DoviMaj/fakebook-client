import { createContext } from "react";
// export type GlobalContent = {
//   user: {};
//   getUser: (c: string) => void;
// };
// export const MyGlobalContext = createContext<GlobalContent>({
//   user: {}, // set a default value
//   getUser: () => {},
// });


export const userContext = createContext({} as any);

// export const useGlobalContext = () => useContext(MyGlobalContext);
