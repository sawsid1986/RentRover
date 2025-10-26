import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Vehicle } from "./Vehicle";
import { VehicleListItem } from "./VehicleListItem";
import { Loading } from "../Shared/Loading";
import ApiClient from "../../common/api/ApiClient";

const mockVehicles: Vehicle[] = [
  {
    id: 1,
    make: "Toyota",
    model: "Camry",
    year: 2020,
    licensePlate: "ABC-123",
    status: "available",
  },
  {
    id: 2,
    make: "Honda",
    model: "Civic",
    year: 2019,
    licensePlate: "XYZ-789",
    status: "rented",
  },
  {
    id: 3,
    make: "Tesla",
    model: "Model 3",
    year: 2022,
    licensePlate: "ELEC-01",
    status: "available",
  },
];

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
      const response = await ApiClient("/api/vehicles");
      if (!mounted) return;
      setVehicles(Array.isArray(response) ? response : []);
    } catch {
      if (mounted) {
        setVehicles(mockVehicles);
        setError("Unable to load vehicles from API — showing sample data.");
      }
    } finally {
      if (mounted) setLoading(false);
    }
    //   .then(async (res) => {
    //     if (!res.ok) throw new Error(`HTTP ${res.status}`);
    //     const data = await res.json();
    //     if (!mounted) return;
    //     setVehicles(Array.isArray(data) ? data : []);
    //   })
    //   .catch((_) => {
    //     // fallback to mock data when API is not available

    //   })
    //   .finally(() => {
    //     if (mounted) setLoading(false);
    //   });

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
            onClick={() => fetchVehicles()}
            type="button"
          >
            Refresh
          </button>
        </div>
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

      <Loading loading={loading} message="Loading vehicles..." />

      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}

      {!loading && vehicles.length === 0 && (
        <div className="alert alert-info">No vehicles found.</div>
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
                <th>Plate</th>
                <th>Status</th>
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
