/*import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { FaHome, FaUser, FaRegistered } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";
import { VscOrganization } from "react-icons/vsc";
export const NavBar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header className="fixed top-0 left-0 bg-gray-800 text-white p-5 w-full z-100">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
        <h1 >Golden Future Supportive Trust</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <NavLink to="/" className="flex items-center space-x-2 text-white hover:text-gray-400">
                <FaHome />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="flex items-center space-x-2 text-white hover:text-gray-400">
              <VscOrganization />
                <span>About</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="flex items-center space-x-2 text-white hover:text-gray-400">
              <BiSolidContact />
                <span>Contact</span>
              </NavLink>
            </li>
            {isLoggedIn ? (
              <li>
                <NavLink to="/logout" className="flex items-center space-x-2 text-white hover:text-gray-400">
                  <span>Logout</span>
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/register" className="flex items-center space-x-2 text-white hover:text-gray-400">
                    <FaRegistered />
                    <span>Register</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" className="flex items-center space-x-2 text-white hover:text-gray-400">
                    <FaUser />
                    <span>Login</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
*/

/*import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { FaHome, FaUser, FaRegistered } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";
import { VscOrganization } from "react-icons/vsc";
import "./NavBar.css";

export const NavBar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header className="header">
      <div className="container">
        <div className="brand">
          <h1> <span>Gol</span>den Future <span>Suppor</span>tive <span>Trust</span></h1>
        </div>
        <nav className="navbar">
          <ul>
            <li>
              <NavLink to="/" className="nav-link">
                <FaHome />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="nav-link">
                <VscOrganization />
                <span>About</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="nav-link">
                <BiSolidContact />
                <span>Contact</span>
              </NavLink>
            </li>
            {isLoggedIn ? (
              <li>
                <NavLink to="/logout" className="nav-link">
                  <span>Logout</span>
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/register" className="nav-link">
                    <FaRegistered />
                    <span>Register</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" className="nav-link">
                    <FaUser />
                    <span>Login</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
*/
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { FaHome, FaUser, FaRegistered } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";
import { VscOrganization } from "react-icons/vsc";
import { FaBars } from "react-icons/fa"; // Import the hamburger icon
import "./NavBar.css";

export const NavBar = () => {
  const { isLoggedIn } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="brand">
          <h1>
            <span>Gol</span>den Future <span>Suppor</span>tive <span>Trust</span>
          </h1>
        </div>
        <nav className="navbar">
          <FaBars className="hamburger" onClick={toggleMenu} />
          <ul className={menuOpen ? "show" : ""}>
            <li>
              <NavLink to="/" className="nav-link">
                <FaHome />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="nav-link">
                <VscOrganization />
                <span>About</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="nav-link">
                <BiSolidContact />
                <span>Contact</span>
              </NavLink>
            </li>
            {isLoggedIn ? (
              <li>
                <NavLink to="/logout" className="nav-link">
                  <span>Logout</span>
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/register" className="nav-link">
                    <FaRegistered />
                    <span>Register</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" className="nav-link">
                    <FaUser />
                    <span>Login</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
