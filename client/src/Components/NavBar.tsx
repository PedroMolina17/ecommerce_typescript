import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

interface NavBarProps {
  selectedMenuItem: string;
  setSelectedMenuItem: (item: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({
  selectedMenuItem,
  setSelectedMenuItem,
}) => {
  const location = useLocation();

  const handleMenuClick = (menuItem: string) => {
    setSelectedMenuItem(menuItem);
    localStorage.setItem("selectedMenuItem", menuItem);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex mx-28 my-4 max-md:hidden">
      <ul className="flex gap-4 font-semibold">
        <Link
          to="/"
          onClick={() => handleMenuClick("Home")}
          className={
            isActive("/") || selectedMenuItem === "Home"
              ? "text-[#139dba] border-t-2 border-[#139dba]"
              : ""
          }
        >
          Home
        </Link>
        <Link
          to="/electronics"
          onClick={() => handleMenuClick("Electronica")}
          className={
            isActive("/electronics") || selectedMenuItem === "Electronica"
              ? "text-[#139dba] border-t-2 border-[#139dba]"
              : ""
          }
        >
          Electronica
        </Link>
        <Link
          to="/deals"
          onClick={() => handleMenuClick("Ofertas")}
          className={
            isActive("/deals") || selectedMenuItem === "Ofertas"
              ? "text-[#139dba] border-t-2 border-[#139dba]"
              : ""
          }
        >
          Ofertas de hoy
        </Link>
        <Link
          to="/cellphones"
          onClick={() => handleMenuClick("Celulares")}
          className={
            isActive("/cellphones") || selectedMenuItem === "Celulares"
              ? "text-[#139dba] border-t-2 border-[#139dba]"
              : ""
          }
        >
          Celulares
        </Link>
        <Link
          to="/accesories"
          onClick={() => handleMenuClick("accesories")}
          className={
            isActive("/accesories") || selectedMenuItem === "accesories"
              ? "text-[#139dba] border-t-2 border-[#139dba]"
              : ""
          }
        >
          Accesorios
        </Link>
        <Link
          to="/blogs"
          onClick={() => handleMenuClick("Blog")}
          className={
            isActive("/blogs") || selectedMenuItem === "Blog"
              ? "text-[#139dba] border-t-2 border-[#139dba]"
              : ""
          }
        >
          Blog
        </Link>
      </ul>
    </div>
  );
};

NavBar.propTypes = {
  selectedMenuItem: PropTypes.string.isRequired,
  setSelectedMenuItem: PropTypes.func.isRequired,
};

export default NavBar;
