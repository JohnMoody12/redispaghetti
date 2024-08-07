import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="bg-slate-200 min-w-[100vw] flex min-h-[5vh]">
      <nav>
        <ul className="flex space-x-4 min-w-[50vw] min-h-[5vh] ml-5 text-xl items-center">
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
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
