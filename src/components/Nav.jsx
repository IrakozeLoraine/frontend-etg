import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand text-bold" to={'/'}>
          ETG - Electricity Token Generator
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav">
            {/* <li className="nav-item">
              <Link className="nav-link" to={'/info'}>
                Token Information
              </Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to={'/check'}>
                Find duration
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to={'/buy'}>
                Buy new
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
