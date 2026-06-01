import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <div
      className="bg-light border-end vh-100 p-3"
      style={{ width: "250px" }}
    >

      <h5>Menu</h5>

      <ul className="nav flex-column">

        <li className="nav-item">
          <Link
            className="nav-link"
            to="/dashboard"
          >
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            to="/tasks"
          >
            Tasks
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            to="/members"
          >
            Members
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            to="/organization"
          >
            Organization
          </Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;