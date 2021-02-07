import { useState } from "react";

import { Button } from "../../atoms";
import Header from "../Header";
import Task from "./Task";

import "./Tasks.scss";

const randTasks = [
  {
    id: "1",
    text: "Just a short todo",
    isChecked: false,
    isRemoved: false,
  },
  {
    id: "2",
    text: "You can mark me as done",
    isChecked: false,
    isRemoved: false,
  },
  {
    id: "3",
    text: "Well, you can delete me",
    isChecked: true,
    isRemoved: false,
  }
];

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState(randTasks);

  const handleTaskAddClick = () => {

  }

  const handleTaskCheckClick = (id: string) => {
    const tasksCopy = [...tasks];
    const task = tasksCopy.find(task => task.id === id);

    if (task) {
      task.isChecked = !task.isChecked;
      setTasks(tasksCopy);
    }
  }

  const handleTaskTextChange = (newText: string, id: string) => {
    const tasksCopy = [...tasks];
    const task = tasksCopy.find(task => task.id === id);

    if (task) {
      task.text = newText;
      setTasks(tasksCopy);
    }
  }

  const handleTaskRemove = (id: string) => {
    const tasksCopy = [...tasks];
    const task = tasksCopy.find(task => task.id === id);

    if (task) {
      task.isRemoved = true;
      setTasks(tasksCopy);
    }
  }

  return <div className="Tasks">
    <div className="Tasks__Wrapper">
      <Header margin="0 0 16px 0" />
      <div className="Tasks__Wrapper__Body">
        {tasks.filter(task => task.isRemoved === false).map((task) =>
          <Task
            key={task.id}
            text={task.text}
            isChecked={task.isChecked}
            onCheckClick={() => handleTaskCheckClick(task.id)}
            onTextChange={(newText: string) => handleTaskTextChange(newText, task.id)}
            onTaskRemove={() => handleTaskRemove(task.id)}
          />
        )}
      </div>
      <div className="Tasks__Wrapper__ButtonContainer">
        <Button label="Add Task" onClick={handleTaskAddClick} />
      </div>
    </div>
  </div>;
};

export default Tasks;