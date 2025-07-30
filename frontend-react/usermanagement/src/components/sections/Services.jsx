const Services = () => {
  const services = [
    { id: 1, title: "Metal Works", img: "service-1.jpg" },
    { id: 2, title: "Steel welding", img: "service-2.jpg" },
    { id: 3, title: "Pipe welding", img: "service-3.jpg" },
    { id: 4, title: "Custom welding", img: "service-4.jpg" },
    { id: 5, title: "Steel welding", img: "service-5.jpg" },
    { id: 6, title: "Metal Work", img: "service-6.jpg" },
    { id: 7, title: "Custom Welding", img: "service-7.jpg" },
    { id: 8, title: "Pipe Welding", img: "service-8.jpg" },
  ];

  return (
    <div className="container-fluid service pt-6 pb-6">
      <div className="container">
        <div className="text-center mx-auto" style={{ maxWidth: "600px" }}>
          <h1 className="display-6 text-uppercase mb-5">Reliable & High-Quality Welding Services</h1>
        </div>
        <div className="row g-4">
          {services.map((service) => (
            <div key={service.id} className="col-lg-3 col-md-6">
              <div className="service-item">
                <div className="service-inner pb-5">
                  <img className="img-fluid w-100" src={`/img/${service.img}`} alt={service.title} />
                  <div className="service-text px-5 pt-4">
                    <h5 className="text-uppercase">{service.title}</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </div>
                  <a className="btn btn-light px-3" href="#">
                    Read More<i className="bi bi-chevron-double-right ms-1"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;