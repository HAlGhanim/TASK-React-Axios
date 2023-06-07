import React, { useState } from "react";
import Input from "./Input";
import { addPet } from "../api/pets";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Modal = ({ show, setShowModal }) => {
  const [petInfo, setPetInfo] = useState({});
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => addPet(petInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      setShowModal(false);
    },
  });
  const handleChange = (e) => {
    setPetInfo({ ...petInfo, [e.target.name]: e.target.value });
    // console.log(petInfo);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
    setShowModal(false);
  };

  if (!show) return "";
  return (
    <div
      className="inset-0 fixed  flex justify-center items-center flex-col z-20 overflow-hidden 
  "
    >
      <div className="bg-black absolute z-0 opacity-70 inset-0 "></div>
      <div className="relative z-10 flex flex-col gap-3 border-[3px] border-black rounded-md w-[95%] md:w-[40%] h-[300px] md:h-[30%] bg-white pt-[50px]">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col gap-[10px]"
        >
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="right-0 top-2 absolute w-[70px] border border-black rounded-md ml-auto mr-5 hover:bg-red-400"
          >
            X
          </button>
          <Input placeholder="pet name" name="name" onChange={handleChange} />
          <Input placeholder="pet type" name="type" onChange={handleChange} />
          <Input placeholder="pet image" name="image" onChange={handleChange} />
          <Input
            placeholder="pet adopted"
            name="adopted"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-[70px] border border-black rounded-md ml-auto mr-5 hover:bg-green-400  "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
