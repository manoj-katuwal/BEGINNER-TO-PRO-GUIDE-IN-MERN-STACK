import React from 'react'

const UserProfile = ({userData}) => {
  return (
    <div style={{border: '1px solid black ', padding : "20px "}}>
      <h4>User Profile</h4>
      <p>Name : {userData.name}</p>
      <p>Age : {userData.age}</p>

    </div>
  )
}

export default UserProfile
