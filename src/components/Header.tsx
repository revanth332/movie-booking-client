import { Link, useNavigate } from "react-router-dom";
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
    "theaterToken",
    "userName",
    "userId",
    "theaterId",
    "theaterName",
    "role",
  ]);
  const handleLogout = () => {
    if(cookies.role === "publisher"){
      removeCookies("token");
      removeCookies("theaterName");
      removeCookies("theaterId");
    }
    else if(cookies.role === "user"){
      removeCookies("theaterToken");
      removeCookies("userId");
      removeCookies("userName");
    }
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
                    Publish
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
                to="/publisherSignin"
              >
                Publisher SignIn
              </Link>
            </li>
            <li>
              <Link
                className="block px-4 py-2 hover:font-bold"
                to="/publisherSignup"
              >
                Publisher SignUp
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
