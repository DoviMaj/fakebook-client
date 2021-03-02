import React from "react";
import "./LoginPage.scss";

function LoginPage() {
  return (
    <div className="login-wrapper">
      <div className="login-form">
        <div>
          <p className="logo">fakebook</p>
        </div>
        <div></div>
        <a className="link-button" href="http://localhost:5000/auth/facebook">
          Sign-in with Facebook
        </a>
        <a className="link-button" href="http://localhost:5000/auth/google">
          Sign-in with Google
        </a>
      </div>
    </div>
  );
}

export default LoginPage;