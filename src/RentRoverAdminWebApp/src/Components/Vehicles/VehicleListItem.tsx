import { Vehicle } from "./Vehicle";
import { useNavigate } from "react-router-dom";

export const VehicleListItem = ({ v }: { v: Vehicle }) => {
  const navigate = useNavigate();

  return (
    <tr key={v.id}>
      <td>{v.id}</td>
      <td>{v.make}</td>
      <td>{v.model}</td>
      <td>{v.year}</td>
      <td>{v.licensePlate ?? "-"}</td>
      <td>
        <span
          className={v.status === "available" ? "text-success" : "text-muted"}
        >
          {v.status ?? "unknown"}
        </span>
      </td>
      <td className="text-end">
        <button
          className="btn btn-sm btn-outline-primary me-2"
          onClick={() => navigate(`/vehicles/${v.id}`)}
          type="button"
        >
          View
        </button>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => navigate(`/vehicles/${v.id}/edit`)}
          type="button"
        >
          Edit
        </button>
      </td>
    </tr>
  );
};
