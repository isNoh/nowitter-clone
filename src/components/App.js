import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { Reset } from "styled-reset";
import React from "react";
import "../css/Home.css";
function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  function refreshUser() {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  }

  return (
    <div className="app-main">
      <React.Fragment>
        <Reset />
        {init ? (
          <AppRouter
            isLogged={Boolean(userObj)}
            userObj={userObj}
            refreshUser={refreshUser}
          />
        ) : (
          "Initializing..."
        )}
      </React.Fragment>
    </div>
  );
}

export default App;
