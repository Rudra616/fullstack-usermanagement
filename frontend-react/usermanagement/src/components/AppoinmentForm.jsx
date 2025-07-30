const AppoinmentForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="container-fluid appoinment mt-6 mb-6 py-5">
      <div className="container pt-5">
        <div className="row gy-5 gx-0">
          <div className="col-lg-6 pe-lg-5">
            <h1 className="display-6 text-uppercase text-white mb-4">
              We Complete Welding & Metal Projects in Time
            </h1>
            <p className="text-white mb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus
              augue, iaculis id elit eget, ultrices pulvinar tortor.
            </p>
            <div className="d-flex align-items-start mb-4">
              <div className="btn-lg-square bg-white">
                <i className="bi bi-geo-alt text-dark fs-3"></i>
              </div>
              <div className="ms-3">
                <h6 className="text-white text-uppercase">Office Address</h6>
                <span className="text-white">123 Street, New York, USA</span>
              </div>
            </div>
            <hr className="bg-body" />
            <div className="d-flex align-items-start">
              <div className="btn-lg-square bg-white">
                <i className="bi bi-clock text-dark fs-3"></i>
              </div>
              <div className="ms-3">
                <h6 className="text-white text-uppercase">Office Time</h6>
                <span className="text-white">Mon-Sat 09am-5pm, Sun Closed</span>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-n5">
            <div className="bg-white p-5">
              <h2 className="text-uppercase mb-4">Online Appoinment</h2>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="form-floating">
                      <input type="text" className="form-control border-0 bg-light" id="name" placeholder="Your Name" required />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-floating">
                      <input type="email" className="form-control border-0 bg-light" id="mail" placeholder="Your Email" required />
                      <label htmlFor="mail">Your Email</label>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-floating">
                      <input type="tel" className="form-control border-0 bg-light" id="mobile" placeholder="Your Mobile" required />
                      <label htmlFor="mobile">Your Mobile</label>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-floating">
                      <select className="form-select border-0 bg-light" id="service" required>
                        <option value="">Select Service</option>
                        <option value="steel">Steel Welding</option>
                        <option value="pipe">Pipe Welding</option>
                        <option value="custom">Custom Welding</option>
                      </select>
                      <label htmlFor="service">Choose A Service</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea className="form-control border-0 bg-light" placeholder="Leave a message here" id="message" style={{ height: "130px" }} required></textarea>
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  <div className="col-12 text-center">
                    <button className="btn btn-primary w-100 py-3" type="submit">Submit Now</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppoinmentForm;