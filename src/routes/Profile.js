import { authService } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/Profile.css";

function Profile({ userObj, refreshUser }) {
  const history = useHistory();
  const [newDisplayName, setDisplayName] = useState(userObj.displayName);

  function LogOutClick() {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      authService.signOut();
      history.push("/");
      alert("이용해주셔서 감사합니다!");
    }
  }

  function myChange(e) {
    const {
      target: { value },
    } = e;
    setDisplayName(value);
  }

  async function mySubmit(e) {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
    }

    refreshUser();
  }

  return (
    <div className="profile-main">
      <div className="profile-main__header">
        {newDisplayName
          ? `${newDisplayName}님의 프로필`
          : "닉네임을 입력해주세요."}

        <div className="profile-main__header__pic"></div>
      </div>

      <div className="profile-main__body">
        <form onSubmit={mySubmit}>
          <input
            type="text"
            placeholder="Nickname"
            onChange={myChange}
            className="profile-main__input"
            value={newDisplayName}
            minLength={2}
            maxLength={16}
          />

          <input
            type="submit"
            value="Update Profile"
            className="profile-main__input__submit"
          />
          <button className="profile-main__logout" onClick={LogOutClick}>
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
