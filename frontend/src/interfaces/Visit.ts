import Dog from "./Dog";
import Service from "./Service";

export default interface Visit {
  id: number;
  date: string;
  description: string | null;
  services: Service[];
  dog: Dog | null;
}