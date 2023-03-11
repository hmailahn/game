import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_MuscleGroup } from "../utils/queries";
import ExerciseList from '../components/ExerciseList';

const MuscleGroup = (props) => {
  const { id: muscleGroupId } = useParams();

  const { loading, data } = useQuery(QUERY_MuscleGroup, {
    variables: { id: muscleGroupId },
  });

  const muscleGroup = data?.muscleGroup || {};

  var push = "";
  if (muscleGroup.pushPull === 1) {
    return push;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {muscleGroup.username}
          </span>{" "}
          created on {muscleGroup.createdAt}
        </p>
        <div className="card-body">
          <p>{muscleGroup.name}</p>
          <p>{muscleGroup.pushPull}</p>
        </div>
      </div>
      {muscleGroup.exerciseCount > 0 && <ExerciseList exercises={muscleGroup.exercises} />}
    </div>
  );
};

export default MuscleGroup;
