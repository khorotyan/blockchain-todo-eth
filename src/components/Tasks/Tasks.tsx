import { Button } from "../../atoms";
import Header from "../Header";

import "./Tasks.scss";

const Tasks: React.FC = () => {
  const handleTaskAddClick = () => {

  }

  return <div className="Tasks">
    <div className="Tasks__Wrapper">
      <Header margin="0 0 16px 0"/>
      <div className="Tasks__Wrapper__Body"></div>
      <div className="Tasks__Wrapper__ButtonContainer">
        <Button label="Add Task" onClick={handleTaskAddClick}/>
      </div>
    </div>
  </div>;
};

export default Tasks;