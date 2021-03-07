import { CircularProgress } from "../";

import "./Button.scss";

type ButtonProps = {
  label: string,
  loading: boolean,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
}

const Button: React.FC<ButtonProps> = ({ label, loading, onClick }) => {
  return <button className="CustomButton" onClick={onClick}>
    {loading ? <CircularProgress color="#ffffff" size="26px" /> : label}
  </button>;
};

export default Button;