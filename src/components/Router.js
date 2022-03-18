import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";
import "../css/Home.css";
const AppRouter = ({ refreshUser, isLogged, userObj }) => {
  return (
    <div className="router-main">
      <div className="router-main__body">
        <Router>
          {isLogged && <Navigation userObj={userObj} />}
          <Switch>
            <>
              {isLogged ? (
                <div className="router-main__body__inner">
                  <Route exact path="/">
                    <Home userObj={userObj} />
                  </Route>
                  <Route exact path="/profile">
                    <Profile userObj={userObj} refreshUser={refreshUser} />
                  </Route>
                </div>
              ) : (
                <Route exact path="/">
                  <Auth />
                </Route>
              )}
            </>
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default AppRouter;
