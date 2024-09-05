import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

export default function Header({
  isAuthenticated,
  setAuthenticated,
}: {
  isAuthenticated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
}): JSX.Element {
  const navigate = useNavigate();
  const [cookies, , removeCookies] = useCookies([
    "token",
    "userName",
    "userId",
    "role",
  ]);

  const location = useLocation()

  const handleLogout = () => {
    removeCookies("token");
    removeCookies("userId");
    removeCookies("userName");
    removeCookies("role")
    setAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="flex justify-end w-full bg-black p-2 fixed top-0 z-20">
      <div>
        {isAuthenticated ? (
          <ul className="flex text-white">
            {cookies.role === "user" && (
              <>
                <li className="block px-4 py-2">Hi! {cookies.userName}</li>
                <li>
                  <Link className={`block px-4 py-2 hover:font-bold ${location.pathname === "/" ? "font-bold" : ""}`} to="/">
                      Home
                  </Link>
                </li>
                <li>
                  <Link
                    className={`block px-4 py-2 hover:font-bold ${location.pathname === "/bookings" ? "font-bold" : ""}`}
                    to="/bookings"
                  >
                    Bookings
                  </Link>
                </li>
                <li>
                  <Link
                    className={`block px-4 py-2 hover:font-bold ${location.pathname === "/movies" ? "font-bold" : ""}`}
                    to="/movies"
                  >
                    Movies
                  </Link>
                </li>
              </>
            )}

            {cookies.role === "publisher" && (
              <>
                <li>
                  <Link
                    className={`block px-4 py-2 hover:font-bold ${location.pathname === "/publishMovie" ? "font-bold" : ""}`}
                    to="/publishMovie"
                  >
                    Publish
                  </Link>
                </li>
                <li>
                  <Link
                    className={`block px-4 py-2 hover:font-bold ${location.pathname === "/publishedMovies" ? "font-bold" : ""}`}
                    to="/publishedMovies"
                  >
                    Releases
                  </Link>
                </li>
              </>
            )}
            <li>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 hover:font-bold"
              >
                Signout
              </button>
            </li>
          </ul>
        ) : (
          <ul className="flex text-white">
            <li>
              <Link className={`block px-4 py-2 hover:font-bold ${location.pathname === "/signup" ? "font-bold" : ""}`} to="/signup">
                SignUp
              </Link>
            </li>
            <li>
              <Link className={`block px-4 py-2 hover:font-bold ${location.pathname === "/signin" ? "font-bold" : ""}`} to="/signin">
                SignIn
              </Link>
            </li>
            <li>
              <Link className={`block px-4 py-2 hover:font-bold ${location.pathname === "/" ? "font-bold" : ""}`} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link
                className={`block px-4 py-2 hover:font-bold ${location.pathname === "/publisherSignup" ? "font-bold" : ""}`}
                to="/publisherSignup"
              >
                Exibitor
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
