import React, { Suspense } from "react";
import { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import "./App.css";
import { Loading } from "./components";
import { PrivateRoute, PublicRoute, Loadable } from "./helpers";
import Notfound from "./screens/notfound";
import { loadingState } from "./atoms";
import { FadeIn } from "./animations";

function App() {
  const isLoading = useRecoilValue(loadingState);
  return (
    <Fragment>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Loading spinning={isLoading}>
            <Route path="/" exact>
              <PublicRoute>
                <FadeIn>
                  <Loadable route="login" />
                </FadeIn>
              </PublicRoute>
            </Route>
            <Route path="/register">
              <PublicRoute>
                <Loadable route="register" />
              </PublicRoute>
            </Route>
            <Route path="/dashboard">
              <PrivateRoute>
                <FadeIn>
                  <Loadable route="dashboard" />
                </FadeIn>
              </PrivateRoute>
            </Route>
            <Route path="*">
              <FadeIn>
                <Notfound />
              </FadeIn>
            </Route>
          </Loading>
        </Switch>
      </Suspense>
    </Fragment>
  );
}

export default App;
