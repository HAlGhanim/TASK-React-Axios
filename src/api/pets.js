import instance from "./index";

const getAllPets = async () => {
  const res = await instance.get(`pets`);
  return res.data;
};
const getOnePet = async (id) => {
  const res = await instance.get(`pets/${id}`);
  return res.data;
};
const addPet = async (name, type, adopted, image) => {
  const res = await instance.post(`pets/`, {
    name,
    type,
    adopted,
    image,
  });
  return res;
};
const updatePet = async (petId, name, type, adopted, image) => {
  const res = await instance.put(`pets/${petId}`, {
    name: name,
    type: type,
    adopted: 1,
    image: image,
  });
  return res;
};
const deletePet = async (id) => {
  const res = await instance.delete(`pets/${id}`);
  return res;
};

export { getAllPets, getOnePet, addPet, updatePet, deletePet };
