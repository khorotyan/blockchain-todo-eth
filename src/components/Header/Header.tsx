import "./Header.scss";

type HeaderProps = {
  margin?: string
}

const Header: React.FC<HeaderProps> = ({ margin }) => {
  return <div className="Header" style={{ margin }}>
    <h1 className="Header__AppName">Blockchain ToDo</h1>
  </div>
}

export default Header;