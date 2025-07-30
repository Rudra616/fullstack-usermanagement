import { useEffect } from 'react';

const Carousel = () => {
  useEffect(() => {
    // Initialize carousel if needed
  }, []);

  return (
    <div className="container-fluid p-0 mb-6">
      <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#header-carousel" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#header-carousel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#header-carousel" data-bs-slide-to="2"></button>
        </div>
        <div className="carousel-inner">
          {[1, 2, 3].map((item) => (
            <div key={item} className={`carousel-item ${item === 1 ? 'active' : ''}`}>
              <img className="w-100" src={`/img/carousel-${item}.jpg`} alt={`Welding ${item}`} />
              <div className="carousel-caption">
                <h1 className="display-1 text-uppercase text-white mb-4">Best Metalcraft Solutions</h1>
                <a href="#" className="btn btn-primary py-3 px-4">Explore More</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;