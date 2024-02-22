import PropTypes from "prop-types";
import { Link } from "react-router-dom";
interface NavBarProps {
  selectedMenuItem: string;
  setSelectedMenuItem: (item: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({
  selectedMenuItem,
  setSelectedMenuItem,
}) => {
  return (
    <div className="flex mx-28 my-4 max-md:hidden">
      <ul className="flex gap-4 font-semibold ">
        <Link
          to={"/"}
          onClick={() => setSelectedMenuItem("Home")}
          className={
            selectedMenuItem === "Home"
              ? "text-[#139dba] border-t-2 border-[#139dba] "
              : ""
          }
        >
          Home
        </Link>
        <Link
          to={"/electronics"}
          onClick={() => setSelectedMenuItem("Electronica")}
          className={
            selectedMenuItem === "Electronica"
              ? "text-[#139dba] border-t-2 border-[#139dba]"
              : ""
          }
        >
          Electronica
        </Link>
        <Link
          to={"/deals"}
          onClick={() => setSelectedMenuItem("Ofertas")}
          className={
            selectedMenuItem === "Ofertas"
              ? "text-[#139dba] border-t-2 border-[#139dba]"
              : ""
          }
        >
          Ofertas de hoy
        </Link>
        <Link
          to={"/cellphones"}
          onClick={() => setSelectedMenuItem("Celulares")}
          className={
            selectedMenuItem === "Celulares"
              ? "text-[#139dba] border-t-2 [#139dba] border-[#139dba] "
              : ""
          }
        >
          Celulares
        </Link>
        <Link
          to={"/accesories"}
          onClick={() => setSelectedMenuItem("accesories")}
          className={
            selectedMenuItem === "accesories"
              ? "text-[#139dba] border-t-2 border-[#139dba] "
              : ""
          }
        >
          Accesorios
        </Link>
        <Link
          to={"/blogs"}
          onClick={() => setSelectedMenuItem("Blog")}
          className={
            selectedMenuItem === "Blog"
              ? "text-[#139dba] border-t-2 border-[#139dba] "
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
