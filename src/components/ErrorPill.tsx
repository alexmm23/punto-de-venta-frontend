type ErrorPillProps = {
  message: string;
};

function ErrorPill({ message }: ErrorPillProps) {
  return (
    <section className="error-pill">
      <p>{message}</p>
    </section>
  );
}
export default ErrorPill;
