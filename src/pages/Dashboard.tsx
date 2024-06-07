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
        <Header title="Dashboard" />
        <p>Hello world!</p>
      </DashboardLayout>
    </section>
  );
}

export default Dashboard;
