import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import IconButton from "@material-ui/core/IconButton";

import "./Checkbox.scss";

type CheckboxProps = {
  isChecked: boolean,
  onCheckClick: any,
}

const Checkbox: React.FC<CheckboxProps> = ({ isChecked = false, onCheckClick }) => {
  return <IconButton
    className="CustomCheckbox"
    onClick={onCheckClick}
  >
    {isChecked ? (
      <CheckBoxIcon className="CustomCheckbox__IconChecked" />
    ) : (
      <CheckBoxOutlineBlankIcon className="CustomCheckbox__Icon" />
    )}
  </IconButton>
};

export default Checkbox;