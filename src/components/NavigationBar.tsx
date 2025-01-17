import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logoutLogo from "../assets/img/cerrar-sesion.webp";
function NavigationBar() {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <nav className="navigationBar">
      <ul>
        <li>
          <Link className="text-aquamarine" to="/dashboard">
            Inicio
          </Link>
        </li>
        <li>
          <Link className="text-aquamarine" to="/products">
            Productos
          </Link>
        </li>
        <li>
          <Link className="text-aquamarine" to="/categories">
            Categorías
          </Link>
        </li>
        <li>
          <button className="btn btn-logout" onClick={handleClick}>
            <img src={logoutLogo} alt="Icono de cierre de sesion" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
export default NavigationBar;
