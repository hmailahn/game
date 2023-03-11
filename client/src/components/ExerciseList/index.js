import React from 'react';
import { Link } from 'react-router-dom';

const ExerciseList = ({ exercises }) => {
  return (
    <div className="card mb-3">
  <div className="card-header">
    <span className="text-light">Exercises</span>
  </div>
  <div className="card-body">
    {exercises &&
      exercises.map(exercise => (
        <p className="pill mb-3" key={exercise._id}>
          {exercise.name} {'// '}
          <Link to={`/profile/${exercise.username}`} style={{ fontWeight: 700 }}>
            {exercise.username} on {exercise.createdAt}
          </Link>
        </p>
      ))}
  </div>
</div>
  );
};

export default ExerciseList;