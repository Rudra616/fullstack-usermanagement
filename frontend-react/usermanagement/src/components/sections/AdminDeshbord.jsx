import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, Form, Row, Col, Pagination, Spinner, Button, Alert } from 'react-bootstrap';
import { AuthContext } from '../../AuthProvider';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { userRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    state: '',
    district: '',
    role: '',
    search: '',
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
  });
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [apiErrors, setApiErrors] = useState({
    states: null,
    districts: null,
    users: null
  });

  // Check if user is admin
  useEffect(() => {
    if (userRole !== 'admin') {
      navigate('/');
    }
  }, [userRole, navigate]);

  // Fetch states
  useEffect(() => {
const fetchStates = async () => {
  try {
    const response = await axios.get('http://fullstakeusermanagement.local/states/');
    
    // Handle different possible response structures
    const statesData = response.data.results || response.data.data || response.data;
    
    if (!Array.isArray(statesData)) {
      throw new Error('States data is not an array');
    }
    
    setStates(statesData);
  } catch (err) {
    console.error('Error fetching states:', err);
    setStates([]); // Set to empty array to prevent map errors
  }
};
    fetchStates();
  }, []);

  // Fetch districts when state changes
  useEffect(() => {
    const fetchDistricts = async () => {
      if (filters.state) {
        try {
          const response = await axios.get(
            `http://fullstakeusermanagement.local/districts/?state=${filters.state}`
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
          setApiErrors(prev => ({ ...prev, districts: null }));
        } catch (err) {
          console.error('Error fetching districts:', err);
          setApiErrors(prev => ({ ...prev, districts: 'Failed to load districts' }));
          setDistricts([]);
        }
      } else {
        setDistricts([]);
      }
    };
    fetchDistricts();
  }, [filters.state]);

  // Fetch users with filters and pagination
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('accessToken');
        const params = new URLSearchParams({
          page: pagination.currentPage,
          page_size: pagination.pageSize,
          ...filters,
        }).toString();

        const response = await axios.get(
          `http://127.0.0.1:8000/admin-deshbord/?${params}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.data || !Array.isArray(response.data.results)) {
          throw new Error('Invalid users data format');
        }

        setUsers(response.data.results);
        setPagination(prev => ({
          ...prev,
          totalPages: Math.ceil(response.data.count / pagination.pageSize),
        }));
        setApiErrors(prev => ({ ...prev, users: null }));
      } catch (err) {
        const errorMsg = err.response?.data?.message || 
                        err.response?.data || 
                        err.message || 
                        'Failed to fetch users';
        setError(errorMsg);
        setApiErrors(prev => ({ ...prev, users: errorMsg }));
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }

    };

    fetchUsers();
  }, [filters, pagination.currentPage, pagination.pageSize]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
    // Reset to first page when filters change
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setPagination(prev => ({ ...prev, pageSize: newSize, currentPage: 1 }));
  };

  const handleResetFilters = () => {
    setFilters({
      state: '',
      district: '',
      role: '',
      search: '',
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  if (loading && users.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>
      
      {/* Show API errors if any */}
      {apiErrors.states && (
        <Alert variant="danger" className="mb-3">
          {apiErrors.states}
        </Alert>
      )}
      {apiErrors.districts && (
        <Alert variant="danger" className="mb-3">
          {apiErrors.districts}
        </Alert>
      )}
      {apiErrors.users && (
        <Alert variant="danger" className="mb-3">
          {apiErrors.users}
        </Alert>
      )}

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Filters</h5>
          <Form>
            <Row>
              <Col md={3}>
                <Form.Group controlId="search">
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="text"
                    name="search"
                    placeholder="Search by name, email..."
                    value={filters.search}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="state">
                  <Form.Label>State</Form.Label>
<Form.Select
  name="state"
  value={filters.state}
  onChange={handleFilterChange}
>
  <option value="">All States</option>
  {Array.isArray(states) && states.map(state => (
    <option key={state.id} value={state.id}>
      {state.name}
    </option>
  ))}
</Form.Select>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="district">
                  <Form.Label>District</Form.Label>
                  <Form.Select
                    name="district"
                    value={filters.district}
                    onChange={handleFilterChange}
                    disabled={!filters.state}
                  >
                    <option value="">All Districts</option>
                    {Array.isArray(districts) && districts.map(district => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="role">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    name="role"
                    value={filters.role}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3} className="d-flex align-items-end">
                <Button variant="secondary" onClick={handleResetFilters} className="me-2">
                  Reset Filters
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">Users</h5>
            <div className="d-flex align-items-center">
              <Form.Select
                value={pagination.pageSize}
                onChange={handlePageSizeChange}
                style={{ width: '80px' }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </Form.Select>
              <span className="ms-2">per page</span>
            </div>
          </div>

          {loading ? (
            <div className="d-flex justify-content-center my-4">
              <Spinner animation="border" />
            </div>
          ) : (
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>State</th>
                    <th>District</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.first_name || '-'}</td>
                        <td>{user.last_name || '-'}</td>
                        <td>{user.phoneNumber || '-'}</td>
                        <td>{user.state?.name || '-'}</td>
                        <td>{user.district?.name || '-'}</td>
                        <td>
                          <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <Button variant="info" size="sm" className="me-2">
                            Edit
                          </Button>
                          <Button variant="danger" size="sm">
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <Pagination>
                <Pagination.First
                  onClick={() => handlePageChange(1)}
                  disabled={pagination.currentPage === 1}
                />
                <Pagination.Prev
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                />

                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  let pageNum;
                  if (pagination.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (pagination.currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (pagination.currentPage >= pagination.totalPages - 2) {
                    pageNum = pagination.totalPages - 4 + i;
                  } else {
                    pageNum = pagination.currentPage - 2 + i;
                  }

                  return (
                    <Pagination.Item
                      key={pageNum}
                      active={pageNum === pagination.currentPage}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Pagination.Item>
                  );
                })}

                <Pagination.Next
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                />
                <Pagination.Last
                  onClick={() => handlePageChange(pagination.totalPages)}
                  disabled={pagination.currentPage === pagination.totalPages}
                />
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;