import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { UserInfoProvider } from "./provider/UserInfoProvider";
import { Router } from "./router/Router";

export const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <UserInfoProvider>
          <Router />
        </UserInfoProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
};
