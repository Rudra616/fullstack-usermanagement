import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";

// Create axios instance with interceptors
const axiosWithRefresh = axios.create({
  baseURL: "http://fullstakeusermanagement.local/",
});

// Add response interceptor for token refresh
axiosWithRefresh.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          "http://fullstakeusermanagement.local/token/refresh/",
          { refresh: refreshToken }
        );
        
        localStorage.setItem("accessToken", response.data.access);
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        return axiosWithRefresh(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userRole");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { setIsLoggedIn, setUserRole } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post(
        "http://fullstakeusermanagement.local/token/",
        {
          username: username.trim(),
          password: password,
        }
      );

      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      // Use the axiosWithRefresh instance for subsequent requests
      const profileRes = await axiosWithRefresh.get("users/me/");
      const role = profileRes.data.role;
      
      localStorage.setItem("userRole", role);
      setUserRole(role);
      setIsLoggedIn(true);
      
      navigate("/");
    } catch (error) {
      setErrors(error.response?.data || {});
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            zIndex: 9999,
            cursor: "not-allowed",
          }}
        ></div>
      )}

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light p-4 rounded">
            <h3 className="text-center">Login</h3>
            <form onSubmit={handleLogin}>
              {errors.detail && (
                <div className="alert alert-danger text-center py-1">
                  {errors.detail}
                </div>
              )}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <small>{errors.username}</small>
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <small>{errors.password}</small>
              </div>

              <button
                type="submit"
                className="btn btn-info w-100"
                disabled={loading}
                style={{ cursor: loading ? "not-allowed" : "pointer" }}
              >
                {loading ? "Loging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;