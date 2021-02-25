import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Web3 from "web3";

import { Button } from "../../atoms";
import Header from "../Header";
import Task from "./Task";
import Create from "./Create";
import { tasksAddress, tasksAbi } from "../../constants/config";

import "./Tasks.scss";

const randTasks = [
  {
    id: uuid(),
    text: "Show error when Add button is clicked with no text",
    isCompleted: false,
    isRemoved: false,
  },
  {
    id: uuid(),
    text: "Check multiline input",
    isCompleted: false,
    isRemoved: false,
  },
  {
    id: uuid(),
    text: "Fix the error of the delete task functionality",
    isCompleted: false,
    isRemoved: false,
  }
];

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState(randTasks);
  const [newTaskText, setNewTaskText] = useState("");
  const [account, setAccount] = useState("");

  useEffect(() => {
    (async function getEthWallet() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      // Load deployed contract into the DApp
      const tasksList = new web3.eth.Contract(tasksAbi, tasksAddress);

      const taskCount = await tasksList.methods.getTasksCount().call();
    })();
  }, []);

  const handleTaskAddClick = () => {
    if (newTaskText.length < 1) {
      return;
    }

    const newTask = {
      id: uuid(),
      text: newTaskText,
      isCompleted: false,
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
      task.isCompleted = !task.isCompleted;
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
            isCompleted={task.isCompleted}
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