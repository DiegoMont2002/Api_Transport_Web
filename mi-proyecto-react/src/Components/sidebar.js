import React from "react";
import './sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar d-flex flex-column flex-shrink-0">

    {/* Logo */}
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none">
      <svg className="bi me-2" width="40" height="32">
        <use xlinkHref="#bootstrap"></use>
      </svg>
      <span className="fs-4 fw-bold" style={{ color: "white" }}>"Ruta Maya"</span>
    </a>
    <hr />

    {/* Menú de navegación */}
    <ul className="nav nav-pills flex-column mb-auto" >
        <li className="nav-item">
          <button href="#" className="nav-link active d-flex align-items-center mt-4"> Home
          </button>
        </li>
        <li>
          <button href="#" className="nav-link active d-flex align-items-center mt-3">
             Dashboard
          </button>
        </li>
        <li>
          <button href="#" className="nav-link active d-flex align-items-center mt-3">
             Orders
          </button>
        </li>
        <li>
          <button href="#" className="nav-link active d-flex align-items-center mt-3">
             Products
          </button>
        </li>
        <li>
          <button href="#" className="nav-link active d-flex align-items-center mt-3">
             Customers
          </button>
        </li>
      </ul>


      
    {/* Perfil de usuario */}
    <div className="dropdown">
      <a
        href="#"
        className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
        id="dropdownUser1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src="https://github.com/mdo.png"
          alt="mdo"
          width="32"
          height="32"
          className="rounded-circle me-2"
        />
        <strong>mdo</strong>
      </a>
      <ul className="dropdown-menu dropdown-menu-light text-small">
        <li>
          <a className="dropdown-item" href="#">
            Profile
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Settings
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#" onClick={() => navigate('/login')}>
            Logout
          </a>
        </li>
      </ul>
    </div>
  </div>
);
};
export default Sidebar;
