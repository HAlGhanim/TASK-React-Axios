import instance from "./index";

const getAllPets = async () => {
  const res = await instance.get(`pets`);
  return res.data;
};
const getOnePet = async (id) => {
  const res = await instance.get(`pets/${id}`);
  return res.data;
};
const addPet = async (petInfo) => {
  const res = await instance.post(`pets/`, petInfo);
  return res.data;
};
const updatePet = async (petId, petInfo) => {
  const res = await instance.put(`pets/${petId}`, { ...petInfo, adopted: 1 });
  return res.data;
};
const deletePet = async (id) => {
  const res = await instance.delete(`pets/${id}`);
  return res.data;
};

export { getAllPets, getOnePet, addPet, updatePet, deletePet };
