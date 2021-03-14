import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import "./LoginPage.scss";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.title = "Fakebook | Login";
  }, []);
  return (
    <div className="login-wrapper">
      <div className="login-form">
        <div>
          <p className="logo">fakebook</p>
        </div>
        <a
          className="primary-button"
          onClick={() => setLoading(true)}
          href="http://localhost:5000/auth/facebook"
        >
          Sign-in with Facebook
        </a>
        <a
          className="primary-button"
          onClick={() => setLoading(true)}
          href="http://localhost:5000/auth/google"
        >
          Sign-in with Google
        </a>
      </div>
      {loading && <Spinner />}
    </div>
  );
};

export default LoginPage;
