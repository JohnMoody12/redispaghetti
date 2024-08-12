import { Link } from "react-router-dom";
import Logout from "./Logout";
const Navbar = () => {
  return (
    <div className="bg-slate-400 min-w-[100vw] flex min-h-[5vh] border-solid">
      <nav>
        <ul className="text-blue-950 flex space-x-5 md:space-x-8 min-w-[70vw] min-h-[5vh] ml-5 text-xl md:text-3xl items-center">
          <li>
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/escalations" className="hover:text-blue-600">
              Escalations
            </Link>
          </li>
          <li>
            <Link to="/analytics" className="hover:text-blue-600">
              Analytics
            </Link>
          </li>
          <li>
            <Link to="/srs" className="hover:text-blue-600">
              Srs
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-blue-600">
              Login
            </Link>
          </li>
          <Logout />
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
