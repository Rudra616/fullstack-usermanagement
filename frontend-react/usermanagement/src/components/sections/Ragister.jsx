import React, { useState, useEffect } from "react";
import axios from "axios";

const Ragister = () => {
  const [firstname, newfirstname] = useState("");
  const [lastname, newlastname] = useState("");
  const [username, newusername] = useState("");
  const [password, newpassword] = useState("");
  const [email, newemail] = useState("");
  const [number, newnumber] = useState("");
  const [addres, newaddres] = useState("");
  const [birth, newbirth] = useState("");

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [errors, seterror] = useState({});
  const [loading, setloding] = useState(false);
  const [success, setsuccess] = useState(false);
  const formattedDate = birth
    ? new Date(birth).toISOString().split("T")[0]
    : null;

  // Fetch all states on component mount
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

  // Fetch districts whenever state changes
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

  const HandleRegisterForm = async (e) => {
    e.preventDefault();
    setloding(true);
    const userdata = {
      firstName: firstname.trim(),
      lastName: lastname.trim(),
      userName: username.trim(),
      password: password.trim(),
      email: email.trim(),
      phoneNumber: parseInt(number) || null,
      address: addres.trim(),
      dateOfBirth: formattedDate,
      state_id: selectedState || null,
      district_id: selectedDistrict || null,
    };

    console.log("Sending:", userdata);

    try {
      const response = await axios.post(
        "http://fullstakeusermanagement.local/users/",
        userdata
      );
      console.log("responsedata==>", response.data);
      newfirstname("");
      newlastname("");
      newusername("");
      newpassword("");
      newemail("");
      newnumber("");
      newaddres("");
      newbirth("");
      setSelectedState("");
      setSelectedDistrict("");
      setDistricts([]); // clear district list
      seterror({});
      // Show success
      setsuccess(true);
    } catch (error) {
      seterror(error.response.data);
      console.log("registration error", error);
      console.log("server response:", error.response?.data);
    } finally {
      setloding(false);
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
            <h3>Create an account</h3>
            <form onSubmit={HandleRegisterForm}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => newfirstname(e.target.value)}
                />
                <small>
                  <div style={{ color: "red" }}>{errors.firstName}</div>
                </small>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  value={lastname}
                  onChange={(e) => newlastname(e.target.value)}
                />
                <small>
                  <div style={{ color: "red" }}>{errors.lastName}</div>
                </small>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => newusername(e.target.value)}
                />
                <small>
                  <div style={{ color: "red" }}>{errors.userName}</div>
                </small>
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => newpassword(e.target.value)}
                />
                <small>
                  <div style={{ color: "red" }}>{errors.password}</div>
                </small>
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => newemail(e.target.value)}
                />
                <small>
                  <div style={{ color: "red" }}>{errors.email}</div>
                </small>
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Phone Number"
                  value={number}
                  onChange={(e) => newnumber(e.target.value)}
                />
                <small>
                  <div style={{ color: "red" }}>{errors.phoneNumber}</div>
                </small>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  value={addres}
                  onChange={(e) => newaddres(e.target.value)}
                />
                <small>
                  <div style={{ color: "red" }}>{errors.address}</div>
                </small>
              </div>
              <div className="mb-3">
                {/* State Dropdown */}
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
                <small>
                  <div style={{ color: "red" }}>{errors.state_id}</div>
                </small>
              </div>
              <div className="mb-3">
                {/* District Dropdown */}
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
                <small>
                  <div style={{ color: "red" }}>{errors.district_id}</div>
                </small>
              </div>
              <div className="mb-3">
                <input
                  type="date"
                  className="form-control"
                  value={birth}
                  onChange={(e) => newbirth(e.target.value)}
                />
                <small>
                  <div style={{ color: "red" }}>{errors.dateOfBirth}</div>
                </small>
              </div>
              {success && (
                <div className="alert alert-success">
                  Registration successfully
                </div>
              )}
              <button
                type="submit"
                className="btn btn-info w-100"
                disabled={loading}
                style={{ cursor: loading ? "not-allowed" : "pointer" }}
              >
                {loading ? "Please wait..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ragister;
