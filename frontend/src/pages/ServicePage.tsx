import { useQuery } from "@tanstack/react-query";
import Service from "../interfaces/Service";
import ServiceTable from "../components/ServiceTable";
import { fetchServices } from "../api/services";


export default function ServicePage() {
    const { data: services, error, isLoading } = useQuery<Service[], Error>({
        queryKey: ["services"],
        queryFn: fetchServices,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error instanceof Error) {
        return <div>Error: {error.message}</div>
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-orange-500 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Lista Dostępnych Serwisów
        <ServiceTable services={services}/>
      </h1>
    </div>
  );
}
