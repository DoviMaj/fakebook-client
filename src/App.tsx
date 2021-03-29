import { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import { userContext } from "./GlobalContext";
import FriendsPage from "./pages/Friends/FriendsPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Spinner from "./components/Spinner/Spinner";

const TimelinePage = lazy(() => import("./pages/Timeline/TimelinePage"));
const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    checkForSession();
  }, []);

  async function checkForSession() {
    setLoading(true);
    try {
      const request = await fetch(`${process.env.REACT_APP_BACKEND}/session`, {
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
    } catch (err) {
      console.log(err);
    }
  }

  const updateCurrentUser = async () => {
    try {
      const req = await fetch(`${process.env.REACT_APP_BACKEND}/api/me`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      setUser(await req.json());
    } catch (err) {
      console.log(err);
    }
  };

  const renderLoader = () => <Spinner />;

  return (
    <>
      {!loading && (
        <>
          <userContext.Provider value={user}>
            <Router basename={process.env.PUBLIC_URL}>
              <Switch>
                <Route exact path="/">
                  {!isAuth ? (
                    <LoginPage />
                  ) : (
                    <Suspense fallback={renderLoader()}>
                      <TimelinePage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/friends">
                  {isAuth ? (
                    <FriendsPage updateCurrentUser={updateCurrentUser} />
                  ) : (
                    <Redirect to="/" />
                  )}
                </Route>
                <Route path="/:id">
                  {isAuth ? <ProfilePage /> : <Redirect to="/" />}
                </Route>
              </Switch>
            </Router>{" "}
          </userContext.Provider>
        </>
      )}
    </>
  );
};

export default App;
