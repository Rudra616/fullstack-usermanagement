const Team = () => {
    
  const teamMembers = [
    {
      id: 1,
      name: "Alex Robin",
      position: "Welder",
      image: "team-1.jpg"
    },
    {
      id: 2,
      name: "Andrew Bon",
      position: "Welder",
      image: "team-2.jpg"
    },
    {
      id: 3,
      name: "Martin Tompson",
      position: "Welder",
      image: "team-3.jpg"
    },
    {
      id: 4,
      name: "Clarabelle Samber",
      position: "Welder",
      image: "team-4.jpg"
    }
  ];

  return (
    <>
    <div className="container-fluid team pt-6 pb-6">
      <div className="container">
        <div className="text-center mx-auto" style={{ maxWidth: "600px" }}>
          <h1 className="display-6 text-uppercase mb-5">
            Meet Our Professional and Experience Welder
          </h1>
        </div>
        <div className="row g-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="col-lg-3 col-md-6">
              <div className="team-item">
                <div className="position-relative overflow-hidden">
                  <img className="img-fluid w-100" src={`/img/${member.image}`} alt={member.name} />
                  <div className="team-social">
                    <a className="btn btn-square btn-dark mx-1" href="#"><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-square btn-dark mx-1" href="#"><i className="fab fa-twitter"></i></a>
                    <a className="btn btn-square btn-dark mx-1" href="#"><i className="fab fa-linkedin-in"></i></a>
                    <a className="btn btn-square btn-dark mx-1" href="#"><i className="fab fa-youtube"></i></a>
                  </div>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-1">{member.name}</h5>
                  <span>{member.position}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    </>
  );
};

export default Team;