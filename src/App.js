import "./App.css";
import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";

function App() {
  const [isAuth, setIsAuth] = useState();
  const [loading, setLoading] = useState();

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
        <div className="App">
          {!isAuth ? (
            <LoginPage />
          ) : (
            <button>
              <a href="http://localhost:5000/auth/logout">Logout</a>
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default App;
