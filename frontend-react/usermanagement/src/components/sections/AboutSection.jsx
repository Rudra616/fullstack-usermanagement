const AboutSection = () => {
  return (
    <div className="container-fluid pt-6 pb-6">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6">
            <div className="about-img">
              <img className="img-fluid w-100" src="/img/about.jpg" alt="About Weldork" />
            </div>
          </div>
          <div className="col-lg-6">
            <h1 className="display-6 text-uppercase mb-4">Ultimate Welding and Quality Metal Solutions</h1>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue,
              iaculis id elit eget, ultrices pulvinar tortor.
            </p>
            {/* Rest of your about section content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection; // This is the key line that was missing