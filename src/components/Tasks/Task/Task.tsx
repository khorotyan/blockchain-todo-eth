import React from "react";
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
  const handleTextChange = (event: React.FormEvent<HTMLInputElement>) => {
    onTextChange(event.currentTarget.value);
  }

  return <div className="Task">
    <Checkbox isChecked={isChecked} onCheckClick={onCheckClick}/>
    <input className="Task__Input" type="text" value={text} onChange={handleTextChange}/>
    <button className="Task__RemoveButton" onClick={onTaskRemove}>
      <img className="Task__RemoveButton__Icon" src={removeIcon} alt="Remove task"/>
    </button>
  </div>
}

export default Task;