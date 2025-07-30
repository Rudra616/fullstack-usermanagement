const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter submission
  };

  return (
    <div className="container-fluid newsletter mt-6 wow fadeIn">
      <div className="container pb-5">
        <div className="bg-white p-5 mb-5">
          <div className="row g-5">
            <div className="col-md-6">
              <h1 className="display-6 text-uppercase mb-4">Newsletter</h1>
              <div className="d-flex">
                <i className="far fa-envelope-open fa-3x text-primary me-4"></i>
                <p className="fs-5 fst-italic mb-0">
                  Dolores sed duo clita tempor justo dolor et stet lorem kasd labore lorem ipsum.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input 
                    type="email" 
                    className="form-control border-0 bg-light" 
                    id="newsletterEmail" 
                    placeholder="Your Email"
                    required 
                  />
                  <label htmlFor="newsletterEmail">Your Email</label>
                </div>
                <button className="btn btn-primary w-100 py-3" type="submit">
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;