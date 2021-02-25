import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import IconButton from "@material-ui/core/IconButton";

import "./Checkbox.scss";

type CheckboxProps = {
  isCompleted: boolean,
  onCheckClick: any,
}

const Checkbox: React.FC<CheckboxProps> = ({ isCompleted = false, onCheckClick }) => {
  return <IconButton
    className="CustomCheckbox"
    onClick={onCheckClick}
  >
    {isCompleted ? (
      <CheckBoxIcon className="CustomCheckbox__IconChecked" />
    ) : (
      <CheckBoxOutlineBlankIcon className="CustomCheckbox__Icon" />
    )}
  </IconButton>
};

export default Checkbox;