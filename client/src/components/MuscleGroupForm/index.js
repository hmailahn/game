import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_MuscleGroup } from "../../utils/mutations";
import { QUERY_MuscleGroups, QUERY_ME } from '../../utils/queries';

const MuscleGroupForm = () => {
  const [name, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addMuscleGroup, { error }] = useMutation(ADD_MuscleGroup, {
    update(cache, { data: { addMuscleGroup } }) {

        try {
            // update me array's cache
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
              query: QUERY_ME,
              data: { me: { ...me, muscleGroups: [...me.muscleGroups, addMuscleGroup] } },
            });
          } catch (e) {
            console.warn("First muscleGroups insertion by user!")
          }

      // read what's currently in the cache
      const { muscleGroups } = cache.readQuery({ query: QUERY_MuscleGroups });
  
      // prepend the newest thought to the front of the array
      cache.writeQuery({
        query: QUERY_MuscleGroups,
        data: { muscleGroups: [addMuscleGroup, ...muscleGroups] }
      });
    }
  });

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add thought to database
      await addMuscleGroup({
        variables: { name },
      });

      // clear form value
      setText("");
      setCharacterCount(0);
    } catch (e) {
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
          placeholder="Here's a new thought..."
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

export default MuscleGroupForm;
