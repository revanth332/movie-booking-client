import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Header({isAuthenticated,setAuthenticated}:{isAuthenticated:boolean,setAuthenticated:(isAuthenticated:boolean) => void}): JSX.Element {
const navigate = useNavigate();
const [cookies,setCookies,removeCookies] = useCookies()
  const handleLogout = () => {
    removeCookies("token")
  setAuthenticated(false);
  navigate("/")
}
  return (
    <div className="flex justify-end w-full absolute z-10">
      <div>
        {isAuthenticated ? (
          <ul className="flex text-white">
            <li>
              <Link className="block px-4 py-2 hover:font-bold" to="/signup">
                Hi! Revanth
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="block px-4 py-2 hover:font-bold">
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
          </ul>
        )}
      </div>
    </div>
  );
}
