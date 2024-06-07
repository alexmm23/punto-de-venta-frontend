import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      <NavigationBar />
      <Header title="Dashboard" />
    </section>
  );
}

export default Dashboard;
