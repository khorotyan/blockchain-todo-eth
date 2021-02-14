import React from "react";
import Input from '@material-ui/core/Input';

import "./Create.scss";

type CreateProps = {
  text: string,
  onTextChange: Function,
}

const Create: React.FC<CreateProps> = ({ text, onTextChange }) => {
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onTextChange(event.currentTarget.value);
  }

  return <div className="Create">
    <Input className="Create__Input" multiline rowsMax={8} value={text} onChange={handleTextChange} placeholder="Create a Task..." />
  </div>
}

export default Create;