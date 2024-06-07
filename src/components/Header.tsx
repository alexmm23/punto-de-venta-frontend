export type HeaderProps = {
  title: string;
};
function Header({ title }: HeaderProps) {
  return (
    <header className="text-center">
      <h1>{title}</h1>
    </header>
  );
}
export default Header;
