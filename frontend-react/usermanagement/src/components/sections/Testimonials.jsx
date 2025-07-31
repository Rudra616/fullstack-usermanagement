import { Carousel } from 'react-bootstrap';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Client Name 1",
      position: "Profession",
      image: "testimonial-1.jpg",
      content: "Dolores sed duo clita tempor justo dolor et stet lorem kasd labore dolore lorem ipsum. At lorem lorem magna ut et, nonumy et labore et tempor diam tempor erat."
    },
    {
      id: 2,
      name: "Client Name 2",
      position: "Profession",
      image: "testimonial-2.jpg",
      content: "Dolores sed duo clita tempor justo dolor et stet lorem kasd labore dolore lorem ipsum. At lorem lorem magna ut et, nonumy et labore et tempor diam tempor erat."
    },
    {
      id: 3,
      name: "Client Name 2",
      position: "Profession",
      image: "testimonial-3.jpg",
      content: "Dolores sed duo clita tempor justo dolor et stet lorem kasd labore dolore lorem ipsum. At lorem lorem magna ut et, nonumy et labore et tempor diam tempor erat."
    },
    {
      id: 4,
      name: "Client Name 2",
      position: "Profession",
      image: "testimonial-4.jpg",
      content: "Dolores sed duo clita tempor justo dolor et stet lorem kasd labore dolore lorem ipsum. At lorem lorem magna ut et, nonumy et labore et tempor diam tempor erat."
    },
    // Add more testimonials as needed
  ];

  return (
    <div className="container-fluid pt-6 pb-6">
      <div className="container">
        <div className="text-center mx-auto" style={{ maxWidth: "600px" }}>
          <h1 className="display-6 text-uppercase mb-5">
            What They're Talking About Our Welding Work
          </h1>
        </div>
        <div className="row g-5 align-items-center">
          <div className="col-lg-5">
            <div className="testimonial-img">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="animated-flip">
                  <img className="img-fluid" src={`/img/${testimonial.image}`} alt={testimonial.name} />
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-7">
            <Carousel indicators={false}>
              {testimonials.map((testimonial) => (
                <Carousel.Item key={testimonial.id}>
                  <div className="testimonial-item">
                    <div className="d-flex align-items-center mb-4">
                      <img className="img-fluid" src={`/img/${testimonial.image}`} alt={testimonial.name} />
                      <div className="ms-3">
                        <div className="mb-2">
                        </div>
                        <h5 className="text-uppercase">{testimonial.name}</h5>
                        <span>{testimonial.position}</span>
                      </div>
                    </div>
                    <p className="fs-5">{testimonial.content}</p>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;