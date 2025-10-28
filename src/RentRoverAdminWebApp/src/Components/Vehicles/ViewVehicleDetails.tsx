import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ApiClient from "../../common/api/ApiClient";
import { Vehicle } from "./models/Vehicle";
import { Loading } from "../Shared/Loading";
import CurrencyFormatter from "../../common/helpers/CurrencyFormatter";

const ViewVehicleDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { vehicle } = location.state;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      {!loading && vehicle != null && (
        <>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => navigate("/vehicles")}
            ></button>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="row">
                <img
                  className="img-fluid"
                  src="../carImages/nia.jpg"
                  alt="Car pic"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="row mt-2">
                <h3 className="col-12">{vehicle?.name}</h3>
              </div>
              <div className="row">
                <h5 className="col-12">{vehicle?.brand}</h5>
              </div>
              <div className="row">
                <h5 className="col-12">{vehicle?.model}</h5>
              </div>
              <div className="row">
                <h5 className="col-12">{vehicle?.year}</h5>
              </div>
              <div className="row">
                <h2 className="themeFontColor col-12">
                  {CurrencyFormatter.format(vehicle?.price)}
                </h2>
              </div>
            </div>
          </div>
        </>
      )}
      <Loading loading={loading} message="Loading vehicles..." />
      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}
    </>
  );
};

export default ViewVehicleDetails;
