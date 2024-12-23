import Service from "../interfaces/Service";

interface ServiceTableProps {
  services: Service[];
}

export default function ServiceTable({ services }: ServiceTableProps) {
  return (
    <table className="w-full table-auto border-collapse bg-orange-300 rounded-lg shadow-lg">
      {/* head */}
      <thead>
        <tr className="bg-orange-400 text-white uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left">#</th>
          <th className="py-3 px-6 text-left">Nazwa</th>
          <th className="py-3 px-6 text-left">Opis</th>
          <th className="py-3 px-6 text-left">Cena</th>
        </tr>
      </thead>
      <tbody className="text-gray-800 text-sm font-medium">
        {services.map((service, index) => (
          <tr
            key={index}
            className="border-b border-orange-500 hover:bg-orange-200 transition-colors"
          >
            <td className="py-3 px-6 text-left whitespace-nowrap">
              {index + 1}
            </td>
            <td className="py-3 px-6 text-left">{service.name}</td>
            <td className="py-3 px-6 text-left">{service.description}</td>
            <td className="py-3 px-6 text-left">{service.price} zł</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
