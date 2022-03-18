import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import Noweet from "components/Noweet";
import NoweetFactory from "components/NoweetFactory";
import "../css/Home.css";
function Home({ userObj }) {
  const [noweets, setNoweets] = useState([]);
  useEffect(() => {
    dbService
      .collection("noweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const noweetArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNoweets(noweetArr);
      });
  }, []);

  return (
    <div className="home-main">
      <div className="home-main__input">
        <NoweetFactory userObj={userObj} />
      </div>

      <div className="home-main__noweet">
        {noweets.map((a) => (
          <Noweet
            key={a.id}
            noweetObj={a}
            isOwner={a.creatorId === userObj.uid}
            fileRefUrl={a.fileRefUrl}
            userObj={userObj}
          />
        ))}
      </div>
    </div>
  );
}
export default Home;
