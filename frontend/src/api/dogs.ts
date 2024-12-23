import api from "../api";
import Dog from "../interfaces/Dog";

const fetchDogs = async (): Promise<Dog[]> => {
  const response = await api.get("/api/dogs/");
  return response.data;
};

const deleteDog = async (dogId: number) => {
  const response = await api.delete(`/api/dogs/${dogId}/`);
  return response.data;
};

const addDog = async (data: FormData): Promise<Dog> => {
  const response = await api.post("/api/dogs/", data);
  return response.data;
};

export { fetchDogs, deleteDog, addDog };
