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

  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div className="flex justify-end w-full bg-black p-2">
      <div>
        {isAuthenticated ? (
          <ul className="flex text-white">
            {cookies.role === "user" && (
              <>
                <li className="block px-4 py-2">Hi! {cookies.userName}</li>
                <li>
                  <Link className="block px-4 py-2 hover:font-bold" to="/">
                      Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="block px-4 py-2 hover:font-bold"
                    to="/bookings"
                  >
                    Bookings
                  </Link>
                </li>
              </>
            )}

            {cookies.role === "publisher" && (
              <>
                <li>
                  <Link
                    className="block px-4 py-2 hover:font-bold"
                    to="/publishMovie"
                  >
                    Publish
                  </Link>
                </li>
                <li>
                  <Link
                    className="block px-4 py-2 hover:font-bold"
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
              <Link className="block px-4 py-2 hover:font-bold" to="/signup">
                SignUp
              </Link>
            </li>
            <li>
              <Link className="block px-4 py-2 hover:font-bold" to="/signin">
                SignIn
              </Link>
            </li>
            <li>
              <Link className="block px-4 py-2 hover:font-bold" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link
                className="block px-4 py-2 hover:font-bold"
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
