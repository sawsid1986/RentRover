import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../Shared/Loading";
import { setToken } from "../../common/auth/AuthSlice";
import { useDispatch } from "react-redux";
import { AuthState } from "../../common/auth/AuthState";

const Login: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const validateInputs = () => {
    if (!userName) return "userName is required";
    // simple email regex
    if (/^[a-z]{1}[a-zA-z0-9]{10,30}$/.test(userName))
      return "Enter a valid user name ";
    if (!password) return "Password is required";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    const postData = { userName, password };

    fetch("/api/Users/Authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(postData), // Convert data to JSON string
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const token = await res.json();
        let currentUser: AuthState = {
          username: userName,
          token: token,
          isAuthenticated: true,
        };
        dispatch(setToken(currentUser));
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        setError("Login failed. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container" style={{ maxWidth: 420, marginTop: 48 }}>
      <h2 className="mb-4">Sign in</h2>
      <form onSubmit={handleSubmit} noValidate>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            User Name
          </label>
          <input
            id="userName"
            type="text"
            className="form-control"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </div>
      </form>

      <Loading loading={loading} message="Signing in…" />

      <div className="mt-3 text-muted small">
        Use any username and password — this is a placeholder UI. Wire real auth
        in later.
      </div>
    </div>
  );
};

export default Login;
