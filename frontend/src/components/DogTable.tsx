import Dog from "../interfaces/Dog";
import { Link } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteDog } from "../api/dogs";

interface DogTableProps {
  dogs: Dog[];
}

export default function DogTable({ dogs }: DogTableProps) {
  const queryClient = useQueryClient();

  const deleteDogMutation = useMutation({
    mutationFn: deleteDog,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["dogs"] });
    },
  });

  return (
    <div className="overflow-x-auto max-w-4xl mx-auto p-4">
      <table className="table-auto w-full text-sm table-striped">
        {/* head */}
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left">Imię</th>
            <th className="px-4 py-2 text-left">Rasa</th>
            <th className="px-4 py-2 text-left">Wiek</th>
            <th className="px-4 py-2 text-center">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {/* rows */}
          {dogs.map((dog) => (
            <tr key={dog.id} className="border-b odd:bg-orange-100">
              <td className="px-4 py-2">
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="mask mask-squircle h-16 w-16">
                      <img
                        src={dog.photo}
                        alt={`Zdjęcie ${dog.name}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold">{dog.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2">{dog.breed}</td>
              <td className="px-4 py-2">{dog.age}</td>
              <td className="px-4 py-2 text-center">
                <Link
                  to={`/psy/${dog.id}/wizyty`}
                  className="btn btn-ghost btn-xs"
                >
                  Details
                </Link>
                <button
                  onClick={() => deleteDogMutation.mutate(dog.id)}
                  className="btn btn-error btn-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
