import React, { useState, useEffect } from "react";
import axios from "axios";

const Ragister = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [birth, setBirth] = useState("");

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formattedDate = birth
    ? new Date(birth).toISOString().split("T")[0]
    : null;

  // Load states on mount
  useEffect(() => {
    axios
      .get("http://fullstakeusermanagement.local/states/")
      .then((res) => {
        setStates(res.data);
      })
      .catch((err) => {
        console.log("Error loading states:", err);
      });
  }, []);

  // Load districts on state change
  useEffect(() => {
    if (selectedState) {
      axios
        .get(
          `http://fullstakeusermanagement.local/districts/?state=${selectedState}`
        )
        .then((res) => {
          setDistricts(res.data);
        })
        .catch((err) => {
          console.log("Error loading districts:", err);
        });
    }
  }, [selectedState]);

  // Hide success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const HandleRegisterForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userdata = {
      first_name: firstname.trim(),
      last_name: lastname.trim(),
      username: username.trim(),
      password: password,
      email: email.trim(),
      phoneNumber: parseInt(number) || null,
      address: address.trim(),
      date_of_birth: formattedDate,
      state_id: selectedState || null,
      district_id: selectedDistrict || null,
    };

    try {
      const response = await axios.post(
        "http://fullstakeusermanagement.local/users/",
        userdata
      );
      console.log("response data ==>", response.data);

      // Reset form
      setFirstname("");
      setLastname("");
      setUsername("");
      setPassword("");
      setEmail("");
      setNumber("");
      setAddress("");
      setBirth("");
      setSelectedState("");
      setSelectedDistrict("");
      setDistricts([]);
      setErrors({});
      setSuccess(true);
    } catch (error) {
      setErrors(error.response?.data || {});
      console.log("Registration error", error);
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
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            zIndex: 9999,
            cursor: "not-allowed",
          }}
        ></div>
      )}

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light p-4 rounded shadow">
            <h3 className="text-center mb-4">Create an Account</h3>
            <form onSubmit={HandleRegisterForm}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <small className="text-danger">{errors.first_name}</small>
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
                <small className="text-danger">{errors.last_name}</small>
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <small className="text-danger">{errors.username}</small>
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <small className="text-danger">{errors.password}</small>
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <small className="text-danger">{errors.email}</small>
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Phone Number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
                <small className="text-danger">{errors.phoneNumber}</small>
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <small className="text-danger">{errors.address}</small>
              </div>

              <div className="mb-3">
                <select
                  className="form-control"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
                <small className="text-danger">{errors.state_id}</small>
              </div>

              <div className="mb-3">
                <select
                  className="form-control"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  disabled={!selectedState}
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
                <small className="text-danger">{errors.district_id}</small>
              </div>

              <div className="mb-3">
                <input
                  type="date"
                  className="form-control"
                  value={birth}
                  onChange={(e) => setBirth(e.target.value)}
                />
                <small className="text-danger">{errors.date_of_birth}</small>
              </div>

              {success && (
                <div className="alert alert-success text-center">
                  Registration successful!
                </div>
              )}

              <button
                type="submit"
                className="btn btn-info w-100"
                disabled={loading}
                style={{ cursor: loading ? "not-allowed" : "pointer" }}
              >
                {loading ? "Please wait..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ragister;
