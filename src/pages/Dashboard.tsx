import Header from "../components/Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <section>
      <DashboardLayout>
        <Header title="Panel de administrador" />
        <p className="text-center">Bienvenido a tu panel de administrador</p>
        <p className="text-center">
          Navega por las pestañas para agregar, modificar o eliminar productos o
          categorías.
        </p>
      </DashboardLayout>
    </section>
  );
}

export default Dashboard;
