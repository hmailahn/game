import React from "react";
import { Navigate, useParams } from "react-router-dom";

import MuscleGroupList from "../components/MuscleGroupList";
import FriendList from "../components/FriendList";

import { QUERY_User, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

import { ADD_FRIEND } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";

import MuscleGroupForm from '../components/MuscleGroupForm';

const Profile = () => {
  const { username: userParam } = useParams();
  const [addFriend] = useMutation(ADD_FRIEND);

  const { loading, data } = useQuery(userParam ? QUERY_User : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>

        {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            Add Friend
          </button>
        )}
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <MuscleGroupList
            muscleGroups={user.muscleGroups}
            title={`${user.username}'s muscleGroups...`}
          />
        </div>
        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
      <div className="mb-3">{!userParam && <MuscleGroupForm />}</div>
    </div>
  );
};

export default Profile;
