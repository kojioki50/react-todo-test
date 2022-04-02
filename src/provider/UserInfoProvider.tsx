import React, { createContext, ReactNode, useState } from "react";
import { Todo } from "../types/type1";

// interface ContextInterface {
//   count: number;
// }

export const UserInfoContext = createContext(
  {} as {
    userInfo: Todo[];
    setUserInfo: React.Dispatch<
      React.SetStateAction<Todo[]>
    >;
  }
);

export const UserInfoProvider = (props: { children: ReactNode }) => {
  const { children } = props;

  const [userInfo, setUserInfo] = useState<Todo[]>([]);

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};
