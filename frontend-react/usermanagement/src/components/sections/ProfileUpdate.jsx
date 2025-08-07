import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';

const Profile = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statesLoading, setStatesLoading] = useState(false);
  const [districtsLoading, setDistrictsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phoneNumber: '',
    address: '',
    state_id: '',
    district_id: '',
    date_of_birth: ''
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      fetchUserData();
      fetchStates();
    }
  }, [isLoggedIn, navigate]);

  const fetchUserData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get('http://127.0.0.1:8000/update-profile/', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      
      const userData = response.data;
      setFormData({
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        username: userData.username || '',
        email: userData.email || '',
        phoneNumber: userData.phoneNumber || '',
        address: userData.address || '',
        state_id: userData.state?.id || '',
        district_id: userData.district?.id || '',
        date_of_birth: userData.date_of_birth || ''
      });
      
      if (userData.state?.id) {
        fetchDistricts(userData.state.id);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setApiError('Failed to load user data. Please try again.');
    }
  };

  const fetchStates = async () => {
    setStatesLoading(true);
    try {
      const response = await axios.get('http://fullstakeusermanagement.local/states/');
      
      // Handle different response structures
      const statesData = 
        Array.isArray(response.data) ? response.data :
        response.data.results ? response.data.results :
        response.data.data ? response.data.data :
        [];
      
      if (!Array.isArray(statesData)) {
        throw new Error('Invalid states data format');
      }
      
      setStates(statesData);
      setApiError(null);
    } catch (error) {
      console.error('Error fetching states:', error);
      setApiError('Failed to load states. Please try again.');
      setStates([]);
    } finally {
      setStatesLoading(false);
    }
  };

  const fetchDistricts = async (stateId) => {
    if (!stateId) {
      setDistricts([]);
      return;
    }

    setDistrictsLoading(true);
    try {
      const response = await axios.get(
        `http://fullstakeusermanagement.local/districts/?state=${stateId}`
      );
      
      const districtsData = 
        Array.isArray(response.data) ? response.data :
        response.data.results ? response.data.results :
        response.data.data ? response.data.data :
        [];
      
      if (!Array.isArray(districtsData)) {
        throw new Error('Invalid districts data format');
      }

      setDistricts(districtsData);
      setApiError(null);
    } catch (error) {
      console.error('Error fetching districts:', error);
      setApiError('Failed to load districts for selected state.');
      setDistricts([]);
    } finally {
      setDistrictsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'state_id') {
      setFormData(prev => ({
        ...prev,
        district_id: '' // Reset district when state changes
      }));
      fetchDistricts(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess(false);
    setApiError(null);
    
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.patch(
        'http://fullstakeusermanagement.local/update-profile/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      setSuccess(true);
      console.log('Profile updated successfully:', response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setApiError('Failed to update profile. Please try again.');
      }
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Update Profile</h3>
            </div>
            <div className="card-body">
              {apiError && (
                <div className="alert alert-danger">{apiError}</div>
              )}
              
              {success && (
                <div className="alert alert-success">
                  Profile updated successfully!
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="first_name" className="form-label">First Name</label>
                    <input
                      type="text"
                      className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                    />
                    {errors.first_name && (
                      <div className="invalid-feedback">{errors.first_name}</div>
                    )}
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="last_name" className="form-label">Last Name</label>
                    <input
                      type="text"
                      className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                    />
                    {errors.last_name && (
                      <div className="invalid-feedback">{errors.last_name}</div>
                    )}
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                  {errors.phoneNumber && (
                    <div className="invalid-feedback">{errors.phoneNumber}</div>
                  )}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <textarea
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                  {errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="state_id" className="form-label">State</label>
                    <select
                      className={`form-control ${errors.state_id ? 'is-invalid' : ''}`}
                      id="state_id"
                      name="state_id"
                      value={formData.state_id}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select State</option>
                      {statesLoading ? (
                        <option disabled>Loading states...</option>
                      ) : (
                        Array.isArray(states) && states.map(state => (
                          <option key={state.id} value={state.id}>{state.name}</option>
                        ))
                      )}
                    </select>
                    {errors.state_id && (
                      <div className="invalid-feedback">{errors.state_id}</div>
                    )}
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="district_id" className="form-label">District</label>
                    <select
                      className={`form-control ${errors.district_id ? 'is-invalid' : ''}`}
                      id="district_id"
                      name="district_id"
                      value={formData.district_id}
                      onChange={handleChange}
                      required
                      disabled={!formData.state_id || districtsLoading}
                    >
                      <option value="">Select District</option>
                      {districtsLoading ? (
                        <option disabled>Loading districts...</option>
                      ) : (
                        Array.isArray(districts) && districts.map(district => (
                          <option key={district.id} value={district.id}>{district.name}</option>
                        ))
                      )}
                    </select>
                    {errors.district_id && (
                      <div className="invalid-feedback">{errors.district_id}</div>
                    )}
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="date_of_birth" className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className={`form-control ${errors.date_of_birth ? 'is-invalid' : ''}`}
                    id="date_of_birth"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                  />
                  {errors.date_of_birth && (
                    <div className="invalid-feedback">{errors.date_of_birth}</div>
                  )}
                </div>
                
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Updating...
                      </>
                    ) : 'Update Profile'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;