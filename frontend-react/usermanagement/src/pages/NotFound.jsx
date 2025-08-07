import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center p-5">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you’re looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </div>
  );
};

export default NotFound;
