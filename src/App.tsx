import { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React from "react";
import LoginPage from "./pages/LoginPage";
// import TimelinePage from "./pages/TimelinePage";
const TimelinePage = lazy(() => import("./pages/TimelinePage"));

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  useEffect(() => {
    checkForSession();
  }, []);

  async function checkForSession() {
    setLoading(true);
    const request = await fetch("http://localhost:5000/session", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const session = await request.json();
    if (session) {
      setIsAuth(true);
      setUser(session.user);
    } else {
      setIsAuth(false);
    }
    setLoading(false);
  }

  const renderLoader = () => <p>Loading</p>;

  return (
    <>
      {!loading && (
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/">
              {!isAuth ? (
                <LoginPage />
              ) : (
                <Suspense fallback={renderLoader()}>
                  <TimelinePage user={user} />
                </Suspense>
              )}
            </Route>
            <Route path="/"></Route>
          </Switch>
        </Router>
      )}
    </>
  );
}

export default App;
