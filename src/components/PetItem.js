import React from "react";
import { Link } from "react-router-dom";
import { deletePet } from "../api/pets";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const PetItem = ({ pet }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deletePet(pet.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });
  const handleDelete = (e) => {
    e.preventDefault();
    mutation.mutate();
  };
  return (
    <div className="w-[300px] h-[400px]  border border-black rounded-md flex flex-col justify-between items-center p-4">
      <h1 className="text-md font-bold">{pet.name}</h1>
      <img
        src={pet.image}
        alt={pet.name}
        className="w-[200px] rounded-md
          "
      />
      <Link to={`/pets/${pet.id}`}>
        <button className=" border border-black px-5 py-1 rounded-md hover:bg-[black] hover:text-white">
          View
        </button>
      </Link>
      <button
        onClick={handleDelete}
        className=" border border-black px-5 py-1 rounded-md hover:bg-[black] hover:text-white"
      >
        Delete
      </button>
    </div>
  );
};

export default PetItem;
