import { useQuery } from "@tanstack/react-query";
import Dog from "../interfaces/Dog";
import DogTable from "../components/DogTable";
import { fetchDogs } from "../api/dogs";
import DogForm from "../components/DogForm";
import "../styles/DogPage.css";

export default function DogPage() {
  const { data: dogs, isLoading } = useQuery<Dog[]>({
    queryKey: ["dogs"],
    queryFn: fetchDogs,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <DogForm />
      <DogTable dogs={dogs} />
    </div>
  );
}
