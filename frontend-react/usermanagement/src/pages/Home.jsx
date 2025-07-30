import Carousel from '../components/sections/Carousel';
import AboutSection from '../components/sections/AboutSection';
import Features from '../components/sections/Features';
import Services from '../components/sections/Services';
import AppoinmentForm from '../components/AppoinmentForm';
import Team from '../components/sections/Team';
import Testimonials from '../components/sections/Testimonials';
import Newsletter from '../components/sections/Newsletter';

const Home = () => {
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