import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Team from './components/sections/Team';
import About from './components/sections/AboutSection';
import AppoinmentForm from './components/AppoinmentForm';
import Services from './components/sections/Services'; // Adjust the path as needed
import Testimonials from './components/sections/Testimonials';

// import Services from './pages/Services';
// import Contact from './pages/Contact';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/Appoinment" element={<AppoinmentForm />} />
        <Route path="/services" element={<Services />} />
        <Route path="/testimonials" element={<Testimonials />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;