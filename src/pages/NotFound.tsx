import Header from "../components/Header";
function NotFound() {
  return (
    <div>
      <Header title="404 Not Found" />
      <p className="text-center">
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
export default NotFound;
