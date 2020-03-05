import React from "react";

const UserProfile = props => {
  return (
    <div className="user-profile">
      {props.item.map(k => (
        <div>{k.id}</div>
      ))}
    </div>
  );
};

export default UserProfile;
