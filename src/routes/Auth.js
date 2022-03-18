import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fbase";
import React from "react";
import "../css/Auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
  async function SocialClick(e) {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  }

  return (
    <div className="auth-main">
      <div className="auth-main__body">
        <p className="auth-main__title">Nowitter</p>
        <AuthForm />

        <div className="auth-main__login">
          <button onClick={SocialClick} name="google">
            Continue with <FontAwesomeIcon icon={faGoogle} size="lg" />
          </button>
          <button onClick={SocialClick} name="github">
            Continue with <FontAwesomeIcon icon={faGithub} size="lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
