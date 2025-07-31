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

  // Fetch all states on component mount
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/states/")
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
        .get(`http://127.0.0.1:8000/districts/?state=${selectedState}`)
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
    const userdata = {
      firstName: firstname,
      lastName: lastname,
      userName: username,
      password: password,
      email: email,
      phoneNumber: number,
      address: addres,
      dateOfBirth: birth,
      state_id: selectedState,
      district_id: selectedDistrict,
    };

    console.log("Sending:", userdata);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users/",
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

      // Show success
      setIsSuccess(true);
    } catch (error) {
      console.log("registration error", error);
      console.log("server response:", error.response?.data);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light p-4 rounded">
          <h3>Create an account</h3>
          <form onSubmit={HandleRegisterForm}>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => newfirstname(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => newlastname(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Username"
              value={username}
              onChange={(e) => newusername(e.target.value)}
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => newpassword(e.target.value)}
            />
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => newemail(e.target.value)}
            />
            <input
              type="number"
              className="form-control mb-3"
              placeholder="Phone Number"
              value={number}
              onChange={(e) => newnumber(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Address"
              value={addres}
              onChange={(e) => newaddres(e.target.value)}
            />

            {/* State Dropdown */}
            <select
              className="form-control mb-3"
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

            {/* District Dropdown */}
            <select
              className="form-control mb-3"
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

            <input
              type="date"
              className="form-control mb-3"
              value={birth}
              onChange={(e) => newbirth(e.target.value)}
            />

            <button type="submit" className="btn btn-info w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Ragister;
