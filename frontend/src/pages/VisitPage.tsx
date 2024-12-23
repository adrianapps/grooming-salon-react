import { useQuery } from "@tanstack/react-query";
import Visit from "../interfaces/Visit";
import { fetchVisits } from "../api/visits";
import VisitTable from "../components/VisitTable";
import VisitForm from "../components/VisitForm";

export default function VisitPage() {
  const { data: visits, isLoading } = useQuery<Visit[]>({
    queryKey: ["visits"],
    queryFn: fetchVisits,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <VisitForm />
      <VisitTable visits={visits} />
    </div>
  );
}
