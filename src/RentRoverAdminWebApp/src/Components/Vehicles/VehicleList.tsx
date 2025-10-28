import React from "react";
import { useNavigate } from "react-router-dom";
import { VehicleListItem } from "./VehicleListItem";
import { Loading } from "../Shared/Loading";
import useVehicleList from "./hooks/useVehicleList";

const VehicleList: React.FC = () => {
  const { vehicles, loading, error, fetchVehicles } = useVehicleList();
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: 24 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Vehicles</h3>
        <div>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => navigate("/vehicles/new")}
            type="button"
          >
            Add vehicle
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <div>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => fetchVehicles()}
            type="button"
          >
            Search
          </button>
        </div>
      </div>

      <Loading loading={loading} message="Loading vehicles..." />

      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}

      {!loading && vehicles.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Price</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <VehicleListItem key={v.id} v={v} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VehicleList;
