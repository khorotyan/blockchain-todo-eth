import React from "react";
import Input from '@material-ui/core/Input';

import { Checkbox } from "../../../atoms";
import removeIcon from "../../../assets/Icons/remove.png";

import "./Task.scss";

type TaskProps = {
  text: string,
  isChecked: boolean,
  onCheckClick: React.MouseEventHandler<HTMLInputElement>,
  onTextChange: Function,
  onTaskRemove: React.MouseEventHandler<HTMLButtonElement>,
}

const Task: React.FC<TaskProps> = ({ text, isChecked, onCheckClick, onTextChange, onTaskRemove }) => {
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onTextChange(event.currentTarget.value);
  }

  return <div className="Task">
    <Checkbox isChecked={isChecked} onCheckClick={onCheckClick} />
    <Input className="Task__Input" value={text} onChange={handleTextChange} defaultValue="Hello world" />
    <button className="Task__RemoveButton" onClick={onTaskRemove}>
      <img className="Task__RemoveButton__Icon" src={removeIcon} alt="Remove task" />
    </button>
  </div>
}

export default Task;