import React from "react";
import { Link } from "react-router-dom";

const MuscleGroupList = ({ muscleGroups, title }) => {
  if (!muscleGroups.length) {
    return <h3>Nothing here Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {muscleGroups &&
        muscleGroups.map((muscleGroup) => (
          <div key={muscleGroup._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${muscleGroup.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {muscleGroup.username}
              </Link>{" "}
              muscleGroup on {muscleGroup.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/muscle-group/${muscleGroup._id}`}>
                <p>{muscleGroup.name}</p>
                <p className="mb-0">
                  Exercises: {muscleGroup.exerciseCount} || Click to{" "}
                  {muscleGroup.exerciseCount ? "see" : "start"} the exercises.
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
  //   return (
  //     <div>
  //       <h3>{title}</h3>
  //       {thoughts &&
  //         thoughts.map(thought => (
  //           <div key={thought._id} className="card mb-3">
  //             <p className="card-header">
  //               {thought.username}
  //               thought on {thought.createdAt}
  //             </p>
  //             <div className="card-body">
  //               <p>{thought.thoughtText}</p>
  //               <p className="mb-0">
  //                 Reactions: {thought.reactionCount} || Click to{' '}
  //                 {thought.reactionCount ? 'see' : 'start'} the discussion!
  //               </p>
  //             </div>
  //           </div>
  //         ))}
  //     </div>
  //   );
};

export default MuscleGroupList;
