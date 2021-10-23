import React from "react";

import more from "../../assets/icons/chevron-down.png";
import { useAuth } from "../../contexts/AuthContext";

export default function UserProfile() {
  const { currentUser } = useAuth();

  return (
    <div className="user">
      <img
        className="user__photo"
        src={`http://localhost:3000/images/${currentUser.photo}`}
        alt="user avatar"
      />
      <div className="user__name">
        <h4>{`${currentUser.firstName} ${currentUser.lastName}`}</h4>
        <div className="user__actions">
          <img src={more} alt="more" />
        </div>
      </div>
    </div>
  );
}
