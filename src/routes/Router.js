import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import publicRoutes from "./publicRoutes";
import privateRoutes from "./privateRoutes";
import ROUTES from "./routes";
import { useAuth } from "../contexts/AuthContext";

export default function Router() {
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

        <Redirect to={ROUTES.SIGN_IN} />
      </Switch>
    </BrowserRouter>
  );
}
