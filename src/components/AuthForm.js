import { authService } from "fbase";
import React, { useState } from "react";
import "../css/Auth.css";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  function ToggleAccount() {
    setNewAccount((prev) => !prev);
  }

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <div className="auth-form">
        <form onSubmit={onSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={onChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={onChange}
          />
          <input type="submit" value={newAccount ? "계정 생성" : "로그인"} />
          {error === "" ? null : <p>{error}</p>}
        </form>
        {/* <span onClick={ToggleAccount}>{newAccount ? "로그인" : "계정 생성"}</span> */}
      </div>
      <div>
        <button
          className="auth-form__login__change"
          onClick={() => {
            ToggleAccount();
          }}
        >
          계정 생성 / 로그인 버튼 바꾸기
        </button>
      </div>
    </div>
  );
}

export default AuthForm;
