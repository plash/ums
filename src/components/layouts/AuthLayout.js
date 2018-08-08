import React, { Component } from "react";
import { Switch } from "react-router-dom";

import PrivateRoute from "../common/PrivateRoute";
import routes from "../../routes/Routes";

class AuthLayout extends Component {
  render() {
    return (
      <div className="app mt-5">
        <div className="app-body sidebar-lg-show">
          <main className="main">
            <div className="container-fluid">
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <PrivateRoute
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      component={route.component}
                    />
                  ) : null;
                })}
              </Switch>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default AuthLayout;
