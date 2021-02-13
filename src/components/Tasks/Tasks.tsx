import { useState } from "react";

import { Button } from "../../atoms";
import Header from "../Header";
import Task from "./Task";
import Create from "./Create";

import "./Tasks.scss";

const randTasks = [
  {
    id: "1",
    text: "Show error when Add button is clicked with no text",
    isChecked: false,
    isRemoved: false,
  },
  {
    id: "2",
    text: "Check multiline input",
    isChecked: false,
    isRemoved: false,
  },
  {
    id: "3",
    text: "Fix the error of the delete task functionality",
    isChecked: false,
    isRemoved: false,
  }
];

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState(randTasks);
  const [newTaskText, setNewTaskText] = useState("");

  const handleTaskAddClick = () => {
    if (newTaskText.length < 3) {
      return;
    }

    const newTask = {
      id: String.fromCharCode(65 + Math.floor(Math.random() * 26)),
      text: newTaskText,
      isChecked: false,
      isRemoved: false,
    };

    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    setNewTaskText("");
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
        <Create
          text={newTaskText}
          onTextChange={(newText: string) => setNewTaskText(newText)}
        />
      </div>
      <div className="Tasks__Wrapper__ButtonContainer">
        <Button label="Add Task" onClick={handleTaskAddClick} />
      </div>
    </div>
  </div>;
};

export default Tasks;