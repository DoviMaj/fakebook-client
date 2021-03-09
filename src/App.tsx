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

  const updateCurrentUser = async () => {
    const req = await fetch("http://localhost:5000/api/me", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    setUser(await req.json());
  };

  const renderLoader = () => <Spinner />;

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
                  <userContext.Provider value={user as any}>
                    <TimelinePage />
                  </userContext.Provider>
                </Suspense>
              )}
            </Route>
            <Route path="/friends">
              {isAuth ? (
                <userContext.Provider value={user}>
                  <FriendsPage updateCurrentUser={updateCurrentUser} />
                </userContext.Provider>
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route>
              <userContext.Provider value={user}>
                <ProfilePage />
              </userContext.Provider>
            </Route>
          </Switch>
        </Router>
      )}
    </>
  );
};

export default App;
