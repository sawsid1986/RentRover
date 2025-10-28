import CurrencyFormatter from "../../common/helpers/CurrencyFormatter";
import { Vehicle } from "./models/Vehicle";
import { useNavigate } from "react-router-dom";

export const VehicleListItem = (props: { v: Vehicle }) => {
  const navigate = useNavigate();

  return (
    <tr key={props.v.id}>
      <td>{props.v.id}</td>
      <td>{props.v.brand}</td>
      <td>{props.v.model}</td>
      <td>{props.v.year}</td>
      <td>{CurrencyFormatter.format(props.v.price)}</td>

      <td className="text-end">
        <button
          className="btn btn-sm btn-outline-primary me-2"
          onClick={() =>
            navigate(`/vehicles/${props.v.id}`, { state: { vehicle: props.v } })
          }
          type="button"
        >
          View
        </button>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => navigate(`/vehicles/${props.v.id}/edit`)}
          type="button"
        >
          Edit
        </button>
      </td>
    </tr>
  );
};
