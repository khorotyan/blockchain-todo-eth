import "./Button.scss";

type ButtonProps = {
  label: string,
  onClick: React.MouseEventHandler<HTMLButtonElement>,  
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button className="CustomButton" onClick={onClick}>
    {label}
  </button>;
};

export default Button;