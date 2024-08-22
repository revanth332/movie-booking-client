
import { Link } from "react-router-dom";

function Notfound() {
  return (
    <div
      className="flex flex-col items-center 
 justify-center h-screen bg-gray-100"
    >
      <h1 className="text-4xl font-bold text-red-500">404 Not Found</h1>
      <p
        className="text-lg 
 text-gray-500"
      >
        The page you are looking for could not be found.
      </p>
      <Link to="/" className="mt-4 text-blue-500 hover:underline">
        Go back to homepage
      </Link>
    </div>
  );
}

export default Notfound;
