import { FC } from "react";

import SignInPage from "../pages/SignPages/SignInPage";
import SignUpPage from "../pages/SignPages/SignUpPage";
import ROUTES from "./routes";

interface Route {
  path: ROUTES.SIGN_IN | ROUTES.SIGN_UP;
  exact: boolean;
  component: FC;
}

const publicRoutes: Route[] = [
  { path: ROUTES.SIGN_IN, exact: true, component: SignInPage },
  { path: ROUTES.SIGN_UP, exact: true, component: SignUpPage },
];

export default publicRoutes;
