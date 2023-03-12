import React, { useState } from "react";
import { ADD_Exercise } from "../../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";

const ExerciseForm = ({ muscleGroupId }) => {
  const [name, setBody] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [addExercise, { error }] = useMutation(ADD_Exercise);

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
        await addExercise({
            variables: { name, muscleGroupId}
        });

    setBody("");
    setCharacterCount(0);
    }
    catch(e) {
        console.error(e);
    }
  };

  return (
    <div>
      <p
        className={`m-0 ${characterCount === 280 || error ? "text-error" : ""}`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Leave a reaction to this thought..."
          value={name}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>

        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ExerciseForm;
