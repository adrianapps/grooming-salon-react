import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchDogVisits } from "../api/visits";
import VisitTable from "../components/VisitTable";
import Visit from "../interfaces/Visit";

export default function DogVisitsPage() {
  const { id } = useParams();
  const { data: visits, isLoading } = useQuery<Visit[]>({
    queryKey: ["dog-visits", id],
    queryFn: () => fetchDogVisits(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-300 to-yellow-300 p-6 rounded-lg shadow-lg">
      {visits.length > 0 ? (
        <>
          <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            Lista Wizyt Psa o Imieniu {visits[0].dog?.name}
          </h1>
          <VisitTable visits={visits} />
        </>
      ) : (
        <h1 className="text-xl text-gray-600 text-center">
          Brak wizyt do wyświetlenia
        </h1>
      )}
    </div>
  );
}
