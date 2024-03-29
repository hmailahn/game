import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_MuscleGroups, QUERY_ME_BASIC } from "../utils/queries";
import MuscleGroupList from "../components/MuscleGroupList";
import Auth from "../utils/auth";
import FriendList from "../components/FriendList";
import MuscleGroupForm from "../components/MuscleGroupForm";

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_MuscleGroups);
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  const muscleGroups = data?.muscleGroups || [];
  console.log(muscleGroups);

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <MuscleGroupForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <MuscleGroupList
              muscleGroups={muscleGroups}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
