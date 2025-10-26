import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "../../common/store/models/RootState";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../../common/auth/AuthSlice";
import ButtonLink from "./HeaderLink";

const Header = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(clearAuth());
    navigate("/Login");
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          RentRover Admin
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            {isAuthenticated && (
              <>
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/Vehicles">
                    Vehicles
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {isAuthenticated && (
              <li className="nav-item active">
                <button
                  className="btn btn-primary my-2 my-sm-0"
                  onClick={() => logout()}
                  type="button"
                >
                  Logout
                </button>
              </li>
            )}

            {!isAuthenticated && (
              <li className="nav-item active">
                <ButtonLink className="btn btn-outline-success" to="/Login">
                  Login
                </ButtonLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Header;
