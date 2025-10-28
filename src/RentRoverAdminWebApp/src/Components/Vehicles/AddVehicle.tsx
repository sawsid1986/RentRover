import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../Shared/Loading";
import useAddVehicle from "./hooks/useAddVehicle";
import CustomInput from "../Shared/CustomInput";
import {
  requiredValidator,
  requiredValidatorForNumber,
} from "../../common/utils/Validators";

export const AddVehicle = () => {
  const navigate = useNavigate();
  const { form, loading, error, update, saveVehicle } = useAddVehicle();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameError = requiredValidator(form.name);
    const brandError = requiredValidator(form.brand);
    const modelError = requiredValidator(form.model);
    const yearError = requiredValidatorForNumber(form.year);
    const priceError = requiredValidatorForNumber(form.price);

    if (nameError) {
      if (inputRef.current != null) inputRef.current.focus();
      return;
    }
    if (nameError || brandError || modelError || yearError || priceError) {
      return;
    }

    var res = await saveVehicle();
    if (res) {
      navigate("/vehicles");
    }
  };

  return (
    <div style={{ marginTop: 24 }}>
      <h3>Add vehicle</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <CustomInput
            id="name"
            type="text"
            ref={inputRef}
            value={form.name}
            update={update}
            label="Name"
            validate={requiredValidator}
          />
        </div>

        <div className="mb-3">
          <CustomInput
            id="brand"
            type="text"
            value={form.brand}
            update={update}
            label="Brand"
            validate={requiredValidator}
          />
        </div>

        <div className="mb-3">
          <CustomInput
            id="model"
            type="text"
            value={form.model}
            update={update}
            label="Model"
            validate={requiredValidator}
          />
        </div>

        <div className="mb-3">
          <CustomInput
            id="year"
            type="number"
            value={form.year}
            update={update}
            label="Year"
            validate={requiredValidator}
          />
        </div>

        <div className="mb-3">
          <CustomInput
            id="price"
            type="number"
            value={form.price}
            update={update}
            label="Price"
            validate={requiredValidator}
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
