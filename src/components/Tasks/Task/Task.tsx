import React from "react";
import Input from '@material-ui/core/Input';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from "@material-ui/core/IconButton";

import { Checkbox } from "../../../atoms";

import "./Task.scss";

type TaskProps = {
  text: string,
  isCompleted: boolean,
  onCheckClick: React.MouseEventHandler<HTMLInputElement>,
  onTextChange: Function,
  onTaskRemove: React.MouseEventHandler<HTMLButtonElement>,
  onInputBlur: Function
}

const Task: React.FC<TaskProps> = ({ text, isCompleted, onCheckClick, onTextChange, onTaskRemove, onInputBlur }) => {
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onTextChange(event.currentTarget.value);
  }

  const handleTextChangeOnBlur = (event: any) => {
    onInputBlur(event.currentTarget.value);
  }

  return <div className="Task">
    <Checkbox isCompleted={isCompleted} onCheckClick={onCheckClick} />
    <Input className="Task__Input" multiline rowsMax={5} value={text} onChange={handleTextChange} onBlur={handleTextChangeOnBlur}/>
    <IconButton className="Task__RemoveButton" onClick={onTaskRemove}>
      <DeleteOutlineIcon className="Task__RemoveButton__Icon" />
    </IconButton>
  </div>
}

export default Task;