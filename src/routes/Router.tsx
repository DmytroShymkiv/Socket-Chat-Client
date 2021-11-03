import { FC } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import publicRoutes from "./publicRoutes";
import privateRoutes from "./privateRoutes";
import ROUTES from "./routes";
import { useAuth } from "../contexts/AuthContext";

const Router: FC = () => {
  const { currentUser } = useAuth();
  return (
    <BrowserRouter>
      <Switch>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}

        {privateRoutes.map((route) => (
          <Route key={route.path} path={route.path} exact={route.exact}>
            {currentUser ? route.component : <Redirect to={ROUTES.SIGN_IN} />}
          </Route>
        ))}

        <Redirect to={currentUser ? ROUTES.CHAT_PAGE : ROUTES.SIGN_IN} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
