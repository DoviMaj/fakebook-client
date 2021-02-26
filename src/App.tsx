import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TimelinePage from "./pages/TimelinePage";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
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
    } else {
      setIsAuth(false);
    }
    setLoading(false);
  }

  return (
    <>
      {!loading && (
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/">
              {!isAuth ? <LoginPage /> : <TimelinePage />}
            </Route>
            <Route path="/"></Route>
          </Switch>
        </Router>
        // <>
        //   {!isAuth ? (
        //     <LoginPage />
        //   ) : (
        //     <a href="http://localhost:5000/auth/logout">Logout</a>
        //   )}
        // </>
      )}
    </>
  );
}

export default App;
