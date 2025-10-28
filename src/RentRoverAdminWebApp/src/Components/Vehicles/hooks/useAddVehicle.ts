import { useState } from "react";
import { VehicleForm } from "../models/VehicleForm";
import ApiClient from "../../../common/api/ApiClient";

const useAddVehicle = () => {
  const [form, setForm] = useState<VehicleForm>({
    name: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (k: string, v: string) => {
    setForm((s) => ({ ...s, [k]: v }));
  };

  const validate = () => {
    if (!form.brand.trim()) return "Make is required";
    if (!form.model.trim()) return "Model is required";
    const y = Number(form.year);
    const now = new Date().getFullYear();
    if (Number.isNaN(y) || y < 1900 || y > now + 1)
      return `Enter a valid year between 1900 and ${now + 1}`;
    return null;
  };

  const saveVehicle = async (): Promise<boolean> => {
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      return false;
    }

    setLoading(true);
    try {
      const payload = {
        name: form.name.trim() || undefined,
        brand: form.brand.trim(),
        model: form.model.trim(),
        year: Number(form.year),
        price: Number(form.price),
      } as const;

      await ApiClient.post("/api/vehicles", payload);
      return true;
    } catch (err: any) {
      setError(err?.message ?? "Failed to add vehicle");
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { form, loading, error, update, saveVehicle };
};

export default useAddVehicle;
