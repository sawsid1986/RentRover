import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../common/api/ApiClient";
import { Loading } from "../Shared/Loading";

type VehicleForm = {
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
};

export const AddVehicle: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<VehicleForm>({
    name: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (k: keyof VehicleForm, v: string) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
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

      // if (!res.ok) {
      //   const text = await res
      //     .text()
      //     .catch(() => res.statusText || "Unknown error");
      //   throw new Error(text || `HTTP ${res.status}`);
      // }

      // success — redirect to list
      navigate("/vehicles");
    } catch (err: any) {
      setError(err?.message ?? "Failed to add vehicle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 24 }}>
      <h3>Add vehicle</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            className="form-control"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="brand" className="form-label">
            Brand
          </label>
          <input
            id="brand"
            className="form-control"
            value={form.brand}
            onChange={(e) => update("brand", e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="model" className="form-label">
            Model
          </label>
          <input
            id="model"
            className="form-control"
            value={form.model}
            onChange={(e) => update("model", e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="year" className="form-label">
            Year
          </label>
          <input
            id="year"
            type="number"
            className="form-control"
            value={form.year}
            onChange={(e) => update("year", e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            id="price"
            type="number"
            className="form-control"
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
            required
          />
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Saving…" : "Save"}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
      <Loading loading={loading} message="Saving..." />
    </div>
  );
};

export default AddVehicle;
