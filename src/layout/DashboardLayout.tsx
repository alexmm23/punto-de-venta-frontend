import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <NavigationBar />
      {children}
      <Footer />
    </main>
  );
}

export default DashboardLayout;
