import React from "react";
import { Link, useLocation } from "react-router-dom";

import pageLinks from "./pageLinks";
import UserProfile from "../UserProfile/UserProfile";

import { useAuth } from "../../contexts/AuthContext";
import power from "../../assets/icons/power.png";

export default function TopMenu() {
  const location = useLocation();

  function PageLink({ pageLink }) {
    const isActive = location.pathname === pageLink.name;
    return (
      <Link
        style={{ color: isActive ? "#2A8BF2" : "#707C97" }}
        to={pageLink.link}
      >
        {pageLink.icon({ isActive })}
        <h5>{pageLink.name.substring(1)}</h5>
      </Link>
    );
  }

  return (
    <div className="top-menu">
      <div className="top-menu__content">
        <UserProfile />
        <div className="top-menu__links">
          {pageLinks.map((link) => (
            <PageLink key={link.name} pageLink={link} />
          ))}
        </div>

        <Logout />
      </div>
    </div>
  );
}

function Logout() {
  const { logout } = useAuth();

  return (
    <div onClick={logout} className="logout">
      <img src={power} alt="logout" />
      <p className="logout__title">log out</p>
    </div>
  );
}
