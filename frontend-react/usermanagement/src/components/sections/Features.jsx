const Features = () => {
  const features = [
    {
      icon: 'fa-hammer',
      title: 'Quality Welding',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    // Add other features...
  ];

  return (
    <div className="container-fluid pt-6 pb-6">
      <div className="container pt-4">
        <div className="row g-0 feature-row">
          {features.map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="feature-item border h-100">
                <div className="feature-icon btn-xxl-square bg-primary mb-4 mt-n4">
                  <i className={`fa ${feature.icon} fa-2x text-white`}></i>
                </div>
                <div className="p-5 pt-0">
                  <h5 className="text-uppercase mb-3">{feature.title}</h5>
                  <p>{feature.content}</p>
                  <a className="position-relative text-body text-uppercase small d-flex justify-content-between" href="#">
                    <b className="bg-white pe-3">Read More</b>
                    <i className="bi bi-arrow-right bg-white ps-3"></i>
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

export default Features;