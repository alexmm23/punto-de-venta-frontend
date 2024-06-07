import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function NavigationBar() {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/dashboard");
  };
  return (
    <nav className="navigationBar">
      <ul>
        <li>
          <Link to="/dashboard">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/categories">Categories</Link>
        </li>
        <li>
          <button className="btn btn-logout" onClick={handleClick}>
            Cerrar sesión
          </button>
        </li>
      </ul>
    </nav>
  );
}
export default NavigationBar;
