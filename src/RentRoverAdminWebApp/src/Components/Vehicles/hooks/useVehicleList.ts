import { useEffect, useState } from "react";
import { Vehicle } from "../models/Vehicle";
import ApiClient from "../../../common/api/ApiClient";

const useVehicleList = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return { vehicles, loading, error, fetchVehicles };
};

export default useVehicleList;
