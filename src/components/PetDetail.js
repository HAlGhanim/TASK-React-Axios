import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getOnePet, updatePet, deletePet } from "../api/pets";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const PetDetail = () => {
  const { petId } = useParams();
  const { data: pet, isLoading } = useQuery({
    queryKey: ["pet", petId],
    queryFn: () => getOnePet(petId),
  });
  const queryClient = useQueryClient();
  const mutation1 = useMutation({
    mutationFn: () => updatePet(petId, pet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pet"] });
    },
  });
  const mutation2 = useMutation({
    mutationFn: () => deletePet(petId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pet"] });
    },
  });
  const handleDelete = (e) => {
    e.preventDefault();
    mutation2.mutate();
  };
  if (isLoading) {
    return <h1>Loading ...</h1>;
  }
  if (!pet) {
    return <h1>There is no pet with the id: {petId}</h1>;
  }
  const handleUpdate = (e) => {
    e.preventDefault();
    mutation1.mutate();
  };
  return (
    <div className="bg-[#F9E3BE] w-screen h-[100vh] flex justify-center items-center">
      <div className="border border-black rounded-md w-[70%] h-[70%] overflow-hidden flex flex-col md:flex-row p-5">
        <div className="h-full w-full md:w-[35%]"></div>
        <img
          src={pet.image}
          alt={pet.name}
          className="object-contain w-full h-full"
        />
        <div className="w-full md:w-[65%] h-full pt-[30px] flex flex-col p-3">
          <h1>Name: {pet.name}</h1>
          <h1>Type: {pet.type}</h1>
          <h1>adopted: {pet.adopted}</h1>

          <button
            onClick={handleUpdate}
            className="w-[70px] border border-black rounded-md  hover:bg-green-400 mb-5"
          >
            Adopt
          </button>

          <button
            onClick={handleDelete}
            className="w-[70px] border border-black rounded-md  hover:bg-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;
