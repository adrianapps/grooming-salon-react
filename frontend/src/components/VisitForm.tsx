import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { addVisit } from "../api/visits";
import Dog from "../interfaces/Dog";
import Service from "../interfaces/Service";
import { fetchDogs } from "../api/dogs";
import { fetchServices } from "../api/services";

interface VisitFormData {
  dog: number;
  services: number[];
  date: string;
  description: string;
}

export default function VisitForm() {
  const queryClient = useQueryClient();
  const [visitFormData, setVisitFormData] = useState<VisitFormData>({
    dog: 0,
    services: [],
    date: "",
    description: "",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    data: dogs,
    isLoading: dogsLoading,
    isError: dogsError,
  } = useQuery<Dog[]>({
    queryKey: ["dogs"],
    queryFn: fetchDogs,
  });

  const {
    data: services,
    isLoading: servicesLoading,
    isError: servicesError,
  } = useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  const addVisitMutation = useMutation({
    mutationFn: addVisit,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["visits"] });
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, multiple } = e.target;

    if (type === "select-multiple") {
      const options = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setVisitFormData((prevData) => ({
        ...prevData,
        [name]: options.map(Number),
      }));
    } else {
      setVisitFormData((prevData) => ({
        ...prevData,
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (new Date(visitFormData.date) < new Date()) {
      setErrorMessage("Data wizyty nie może być w przeszłości.");
      setSuccessMessage(null);
    } else if (
      !visitFormData.dog ||
      !visitFormData.services.length ||
      !visitFormData.date
    ) {
      setErrorMessage("Proszę uzupełnić wszystkie pola.");
      setSuccessMessage(null);
    } else {
      addVisitMutation.mutate(visitFormData);
      setVisitFormData({ dog: 0, services: [], date: "", description: "" });
    }
  };

  // Show loading or error states if needed
  if (dogsLoading || servicesLoading) {
    return <div>Loading...</div>;
  }

  if (dogsError || servicesError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return (
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Zarezerwuj Wizytę
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Wybór Psa */}
          <div className="mb-4">
            <label htmlFor="dog" className="block text-gray-700">
              Wybierz psa:
            </label>
            <select
              id="dog"
              name="dog"
              value={visitFormData.dog}
              onChange={handleChange}
              className="input input-bordered w-full mt-2"
            >
              <option value={0}>Wybierz psa</option>
              {dogs?.map((dog) => (
                <option key={dog.id} value={dog.id}>
                  {dog.name} ({dog.breed})
                </option>
              ))}
            </select>
          </div>

          {/* Wybór Usługi */}
          <div className="mb-4">
            <label htmlFor="services" className="block text-gray-700">
              Wybierz usługę:
            </label>
            <select
              id="services"
              name="services"
              value={visitFormData.services}
              onChange={handleChange}
              multiple
              className="input input-bordered w-full mt-2"
            >
              {services?.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} - ${service.price}
                </option>
              ))}
            </select>
          </div>

          {/* Data wizyty */}
          <div className="mb-4">
            <label htmlFor="date">Data wizyty:</label>
            <input
              id="date"
              name="date"
              type="date"
              value={visitFormData.date}
              onChange={handleChange}
              className="input input-bordered w-full mt-2"
            />
            {visitFormData.date &&
              new Date(visitFormData.date) < new Date() && (
                <div className="text-red-500">
                  Data wizyty nie może być w przeszłości.
                </div>
              )}
          </div>

          {/* Opis wizyty */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Opis wizyty:
            </label>
            <textarea
              id="description"
              name="description"
              value={visitFormData.description}
              onChange={handleChange}
              className="input input-bordered w-full mt-2"
              placeholder="Dodaj szczegóły wizyty"
            />
          </div>

          {/* Przyciski */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={
                !visitFormData.dog ||
                !visitFormData.services.length ||
                !visitFormData.date
              }
              className="btn btn-primary w-full py-2 mt-4"
            >
              Zarezerwuj wizytę
            </button>
          </div>
        </form>

        {/* Komunikaty */}
        {successMessage && (
          <div className="mt-4 text-green-500 text-center">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 text-red-500 text-center">{errorMessage}</div>
        )}
      </div>

  );
}
