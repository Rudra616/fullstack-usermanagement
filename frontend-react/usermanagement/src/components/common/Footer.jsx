import { Link } from 'react-router-dom';

const Footer = () => {
  const galleryImages = [1, 2, 3, 4, 5, 6];

  return (
    <div className="container-fluid bg-dark footer py-5" style={{ color:"white" }}>
      <div className="container py-5">
        <div className="row g-5">
          {/* Office Info */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-uppercase text-light mb-4">Our Office</h5>
            <p className="mb-2"><i className="fa fa-map-marker-alt text-primary me-3"></i>123 Street, New York, USA</p>
            <p className="mb-2"><i className="fa fa-phone-alt text-primary me-3"></i>+012 345 67890</p>
            <p className="mb-2"><i className="fa fa-envelope text-primary me-3"></i>info@example.com</p>
            <div className="d-flex pt-3">

            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-uppercase text-light mb-4">Quick Links</h5>
            {['About Us', 'Contact Us', 'Our Services', 'Terms & Condition', 'Support'].map((link) => (
              <Link key={link} className="btn btn-link d-block text-start mb-2" to={`/${link.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}>
                {link}
              </Link>
            ))}
          </div>

          {/* Business Hours */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-uppercase text-light mb-4">Business Hours</h5>
            <p className="text-uppercase mb-0">Monday - Friday</p>
            <p>09:00 am - 07:00 pm</p>
            <p className="text-uppercase mb-0">Saturday</p>
            <p>09:00 am - 12:00 pm</p>
            <p className="text-uppercase mb-0">Sunday</p>
            <p>Closed</p>
          </div>

          {/* Gallery */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-uppercase text-light mb-4">Gallery</h5>
            <div className="row g-1">
              {galleryImages.map((img) => (
                <div key={img} className="col-4">
                  <img className="img-fluid" src={`/img/service-${img}.jpg`} alt={`Service ${img}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="container-fluid text-body copyright py-4" >
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              &copy; <Link className="fw-semi-bold text-decoration-none" to="/">WELDORK</Link>, All Right Reserved.
            </div>
            <div className="col-md-6 text-center text-md-end">
              Designed By <a className="fw-semi-bold" href="https://htmlcodex.com">HTML Codex</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;