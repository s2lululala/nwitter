import { signOut } from '@firebase/auth';
import { authService } from 'myBase';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    signOut(authService);
    history.push("/");
  };
  return(
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
};

export default Profile;