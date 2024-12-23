import api from "../api";
import Service from "../interfaces/Service";

const fetchServices = async (): Promise<Service[]> => {
  const response = await api.get("api/services/");
  return response.data;
};

export { fetchServices };
