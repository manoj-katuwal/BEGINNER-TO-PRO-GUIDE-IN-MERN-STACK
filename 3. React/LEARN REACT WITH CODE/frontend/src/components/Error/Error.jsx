import React from "react";
import UserProfile from "../UserProfile/UserProfile";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

const Error = () => {
  const userData = {
    name: "Manoj Katuwal",
    age: 25,
  };

  const userData1 = null;
  return (
    <div>
      <ErrorBoundary>
        <UserProfile userData={userData} />
      </ErrorBoundary>
      <ErrorBoundary fallback={<p>Error in user profile</p>}>
        <UserProfile userData={userData1} />
      </ErrorBoundary>
    </div>
  );
};

export default Error;
