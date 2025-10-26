import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Vehicle } from "./Vehicle";
import { VehicleListItem } from "./VehicleListItem";
import { Loading } from "../Shared/Loading";
import ApiClient from "../../common/api/ApiClient";

const VehicleList: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    let mounted = true;
    setLoading(true);
    setError(null);

    try {
      const response = await ApiClient.get("/api/vehicles");
      if (!mounted) return;
      setVehicles(Array.isArray(response.data) ? response.data : []);
    } catch {
      if (mounted) {
        setError("Unable to load vehicles from API — showing sample data.");
        setVehicles([]);
      }
    } finally {
      if (mounted) setLoading(false);
    }

    return () => {
      mounted = false;
    };
  };

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
