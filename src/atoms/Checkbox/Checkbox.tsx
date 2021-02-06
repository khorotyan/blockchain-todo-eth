import "./Checkbox.scss";

type CheckboxProps = {
  isChecked: boolean,
  onCheckClick: React.MouseEventHandler<HTMLInputElement>,
}

const Checkbox: React.FC<CheckboxProps> = ({ isChecked = false, onCheckClick }) => {
  return <div>
    <input type="checkbox" checked={isChecked} onClick={onCheckClick}/>
  </div>
};

export default Checkbox;