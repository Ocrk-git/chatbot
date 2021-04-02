import React from "react";

const FromUser = ({ message }) => {
  return (
    <div className='from-user'>
      <div className='user-message'>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default FromUser;
