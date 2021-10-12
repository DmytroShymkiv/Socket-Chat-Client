import SignInPage from "../pages/SignPages/SignInPage";
import SignUpPage from "../pages/SignPages/SignUpPage";
import ROUTES from "./routes";

const publicRoutes = [
  { path: ROUTES.SIGN_IN, exact: true, component: SignInPage },
  { path: ROUTES.SIGN_UP, exact: true, component: SignUpPage },
];

export default publicRoutes;
