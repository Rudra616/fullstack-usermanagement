import Carousel from '../components/sections/Carousel';
import AboutSection from '../components/sections/AboutSection';
import Features from '../components/sections/Features';
import Services from '../components/sections/Services';
import AppoinmentForm from '../components/AppoinmentForm';
import Team from '../components/sections/Team';
import Testimonials from '../components/sections/Testimonials';
import Newsletter from '../components/sections/Newsletter';
import { useEffect } from 'react';
import axios from 'axios';

// Create the same axios instance here
const axiosWithRefresh = axios.create({
  baseURL: "http://fullstakeusermanagement.local/",
});

// Add the same interceptor
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

const Home = () => {
  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axiosWithRefresh.get("protected-view/");
        console.log("Protected data:", response.data);
      } catch (error) {
        console.error("Error fetching protected data:", error);
      }
    };
    
    fetchProtectedData();
  }, []);

  return (
    <>
      <Carousel />
      <AboutSection />
      <Features />
      <Services />
      <AppoinmentForm />
      <Team />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default Home;