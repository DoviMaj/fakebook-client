import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./LoginPage.module.scss";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.title = "Fakebook | Login";
  }, []);
  return (
    <div className={styles.login_wrapper}>
      <div className={styles.login_form}>
        <div>
          <p className={styles.logo}>fakebook</p>
        </div>
        <a
          className="primary-button"
          onClick={() => setLoading(true)}
          href={`${process.env.REACT_APP_BACKEND}/auth/facebook`}
        >
          Sign-in with Facebook
        </a>
        <a
          className="primary-button"
          onClick={() => setLoading(true)}
          href={`${process.env.REACT_APP_BACKEND}/auth/google`}
        >
          Sign-in with Google
        </a>
      </div>
      {loading && <Spinner />}
    </div>
  );
};

export default LoginPage;
