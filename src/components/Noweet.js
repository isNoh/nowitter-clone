import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import "../css/Noweet.css";
function Noweet({ noweetObj, isOwner, fileRefUrl, userObj }) {
  const [edit, setEdit] = useState(false);
  const [newNoweet, setNewNoweet] = useState(noweetObj.text);
  const [nickName, setNickName] = useState(noweetObj.nickname);
  async function myDeleteClick() {
    const ok = window.confirm("Are you sure delete this noweet?");
    if (ok) {
      await dbService.doc(`noweets/${noweetObj.id}`).delete();
      await storageService.refFromURL(noweetObj.fileRefUrl).delete();
    }
  }
  function myEditClick() {
    setEdit((p) => !p);
  }

  async function mySubmit(e) {
    e.preventDefault();
    await dbService.doc(`noweets/${noweetObj.id}`).update({
      text: newNoweet,
    });
    setEdit(false);
  }

  function myChange(e) {
    const {
      target: { value },
    } = e;
    setNewNoweet(value);
  }

  return (
    <div className={isOwner ? "noweet-main__owner" : "noweet-main__notowner"}>
      <div>
        {edit ? (
          <>
            <form onSubmit={mySubmit} className="noweet-main__form">
              <div>
                <input
                  type="text"
                  placeholder="Edit your noweet"
                  value={newNoweet}
                  onChange={myChange}
                  className="noweet-main__edit"
                  required
                />
              </div>
              <div className="noweet-main__edit__btn__header">
                <input
                  type="submit"
                  value="수정"
                  className="noweet-main__edit__btn"
                />
                <button
                  onClick={myEditClick}
                  className="noweet-main__edit__btn"
                >
                  취소
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="noweet-info">
              {isOwner ? null : (
                <div className="noweet-info__header">
                  <h1 style={{ marginBottom: "10px", fontWeight: "600" }}>
                    {nickName || `Someone / ${noweetObj.creatorId.slice(0, 7)}`}
                  </h1>
                  <div className="profile-main__header__pic"></div>
                </div>
              )}
            </div>
            <div className="noweet-inner">
              <div className="noweet-inner__inner">
                <div>
                  {fileRefUrl && (
                    <img src={fileRefUrl} width="200px" height="200px" />
                  )}
                </div>
                <h4>{noweetObj.text}</h4>
              </div>
              <div className="noweet-inner__button">
                {isOwner && (
                  <div className="noweet-inner__button-btn">
                    <button onClick={myEditClick}>수정</button>
                    <button onClick={myDeleteClick}>삭제</button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Noweet;
