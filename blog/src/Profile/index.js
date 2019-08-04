import React from 'react';
import profile from '../images/janice.jpg';

class Profile extends React.Component {

  render() {
    return (
      <div>
        <div className="profile-header">
          <h1>Janice Chan</h1>
        </div>
        <div className="profile-description">
          <div className="profile-des" id="profile-pic"> <img src={profile} alt="Janice Chan"></img> </div>
          <div className="profile-des"><h2>I'm a super cute sophomore at Purdue University who loves her boyfriend a lot.</h2></div>
        </div>
      </div>
    );
  } 
}

export default Profile;
