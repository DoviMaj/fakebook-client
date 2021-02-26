import React from "react";
import "./LoginPage.scss";

function LoginPage(props: any) {
  return (
    <div className="login-wrapper">
      <div className="login-form">
        <div>
          <p className="logo">fakebook</p>
        </div>
        <a className="link-button" href="http://localhost:5000/auth/facebook">
          Sign-in with Facebook
        </a>
      </div>
    </div>
  );
}

export default LoginPage;
