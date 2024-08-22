import { Link } from "react-router-dom";

export default function Header(): JSX.Element {
  return (
    <div className="flex justify-end w-full absolute z-10">
      <div>
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
            <Link className="block px-4 py-2 hover:font-bold" to="/about">
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
