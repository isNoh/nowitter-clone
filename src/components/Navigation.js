import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import "../css/Home.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
function Navigation({ userObj }) {
  const [myIcon, setMyIcon] = useState(true);
  return (
    <div className="nav-bar">
      <ul>
        <li>
          <Link to="/">
            <div
              onClick={() => {
                setMyIcon(true);
              }}
              className="nav-bar__icon"
            >
              <FontAwesomeIcon
                icon={faTwitter}
                size="2x"
                color={myIcon ? "black" : "rgba(0, 0, 0, 0.1)"}
              />
            </div>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <div
              onClick={() => {
                setMyIcon(false);
              }}
              className="nav-bar__icon"
            >
              <FontAwesomeIcon
                icon={faUser}
                size="2x"
                color={myIcon ? "rgba(0, 0, 0, 0.1)" : "black"}
              />
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
export default Navigation;
