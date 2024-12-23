import { deleteVisit } from "../api/visits";
import Visit from "../interfaces/Visit";
import { useQueryClient, useMutation } from "@tanstack/react-query";

interface VisitTableProp {
  visits: Visit[];
  showDeleteButton: boolean;
  isFutureVisit: (date: string) => boolean;
}

export default function VisitTable({
  visits,
  showDeleteButton,
  isFutureVisit,
}: VisitTableProp) {
  const queryClient = useQueryClient();

  const deleteVisitMutation = useMutation({
    mutationFn: deleteVisit,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["visits"] });
    },
  });

  return (
    <div className="overflow-x-auto max-w-4xl mx-auto p-4">
      <table className="table-auto w-full text-sm table-striped">
        {/* Table Head */}
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left">Pies</th>
            <th className="px-4 py-2 text-left">Serwisy</th>
            <th className="px-4 py-2 text-left">Data</th>
            <th className="px-4 py-2 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {visits.map((visit) => (
            <tr key={visit.id} className="border-b odd:bg-orange-100">
              {/* Dog Info */}
              <td className="px-4 py-2">
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="mask mask-squircle h-16 w-16">
                      <img
                        src={visit.dog?.photo}
                        alt={visit.dog?.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold">{visit.dog?.name}</div>
                    <div className="text-sm text-gray-500">
                      {visit.dog?.age} lat
                    </div>
                  </div>
                </div>
              </td>

              {/* Services */}
              <td className="px-4 py-2">
                <ul>
                  {visit.services.map((service, index) => (
                    <li key={index}>{service.name}</li>
                  ))}
                </ul>
              </td>

              {/* Date */}
              <td className="px-4 py-2">
                {new Date(visit.date).toLocaleString()}
              </td>

              {/* Delete Button */}
              <td className="px-4 py-2 text-center">
                {showDeleteButton && isFutureVisit(visit.date) && (
                  <button
                    onClick={() => deleteVisit(visit.id)}
                    className="btn btn-error btn-xs"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
