import React from "react";
import { Link, NavLink } from "react-router-dom";
const TestingNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" href="#">
          JPS
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="#">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="#">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="#">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <Link className="btn btn-outline-light" to="/fieldmaster/add">Add Filed Master</Link>
        <Link className="btn btn-outline-light" to="/taskmastertesting/add">Add Task Master</Link>
      </div>
    </nav>
  );
};

export default TestingNavbar;
