import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../css/NoweetFactory.css";
function NoweetFactory({ userObj }) {
  const [noweet, setNoweet] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [enterMouse, setEnterMouse] = useState(false);

  async function mySubmit(e) {
    e.preventDefault();
    let fileRefUrl = "";
    if (fileUrl != "") {
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await fileRef.putString(fileUrl, "data_url");
      fileRefUrl = await response.ref.getDownloadURL();
    }

    const noweetObj = {
      text: noweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      nickname: userObj.displayName,
      fileRefUrl,
    };
    await dbService.collection("noweets").add(noweetObj);
    setNoweet("");
    setFileUrl("");
  }

  function myChange(e) {
    const {
      target: { value },
    } = e;
    setNoweet(value);
  }

  function onFile(e) {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (fE) => {
      const {
        currentTarget: { result },
      } = fE;
      setFileUrl(result);
    };
    reader.readAsDataURL(theFile);
  }
  return (
    <div className="noweet-body">
      <div className="noweet-body__header">
        <h1>{userObj.displayName || `익명 / ${userObj.uid.slice(0, 7)}`}</h1>
        <div className="profile-main__header__pic"></div>
      </div>

      <form onSubmit={mySubmit}>
        <input
          value={noweet}
          onChange={myChange}
          type="text"
          placeholder="일단, 아무거나 써봐요!"
          maxLength={120}
          className="noweet-input"
          required
        />

        <div className="noweet-body__input">
          <>
            <label htmlFor="uploadimg">
              <FontAwesomeIcon icon={faCamera} size="2x" />
            </label>
            <input
              id="uploadimg"
              type="file"
              accept="image/*"
              onChange={onFile}
              style={{ opacity: 0 }}
              className="noweet-body__btn__hidden"
            />
          </>
          <>
            <input
              type="submit"
              value="전송"
              id="submitimg"
              className="noweet-body__btn"
              style={
                noweet
                  ? { backgroundColor: "#1d9bf0" }
                  : { backgroundColor: "#8ecdf7" }
              }
            />
          </>
        </div>

        <>
          {fileUrl && (
            <div
              className="noweet-body__pic"
              onMouseEnter={() => {
                setEnterMouse(true);
              }}
              onMouseLeave={() => {
                setEnterMouse(false);
              }}
              onClick={() => {
                setFileUrl(null);
              }}
            >
              {enterMouse ? (
                <div className="noweet-body__pic__remove">
                  클릭해서 삭제하기
                </div>
              ) : null}
              <img src={fileUrl} width="150px" height="150px" />
            </div>
          )}
        </>
      </form>
    </div>
  );
}

export default NoweetFactory;
