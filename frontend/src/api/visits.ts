import api from "../api";
import Visit from "../interfaces/Visit";

const fetchVisits = async (): Promise<Visit[]> => {
  const response = await api.get("/api/visits/");
  return response.data;
};

const addVisit = async (data: FormData): Promise<Visit> => {
  const response = await api.post("/api/visits/", data);
  return response.data;
};

const deleteVisit = async (visitId: number) => {
  await api.delete(`/api/visits/${visitId}/`);
};

const fetchDogVisits = async (dogId: string | undefined): Promise<Visit[]> => {
  const response = await api.get(`/api/dogs/${dogId}/visits/`);
  return response.data;
};

export { fetchVisits, addVisit, deleteVisit, fetchDogVisits };
