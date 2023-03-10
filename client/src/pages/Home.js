import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_MuscleGroups } from "../utils/queries";
import MuscleGroupList from '../components/MuscleGroupList';

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_MuscleGroups);
  const muscleGroups = data?.muscleGroups || [];
  console.log(muscleGroups);

  return (
    <main>
    <div className="flex-row justify-space-between">
      <div className="col-12 mb-3">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <MuscleGroupList muscleGroups={muscleGroups} title="Some Feed for Thought(s)..." />
        )}
      </div>
    </div>
  </main>
  );
};

export default Home;
