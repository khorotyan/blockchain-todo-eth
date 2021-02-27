import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Web3 from "web3";

import { Button } from "../../atoms";
import Header from "../Header";
import Task from "./Task";
import Create from "./Create";
import { tasksAddress, tasksAbi } from "../../constants/config";

import "./Tasks.scss";

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTaskText, setNewTaskText] = useState<string>("");
  const [account, setAccount] = useState<string>("");
  const [tasksList, setTasksList] = useState<any>();
  const [addingTask, setAddingTask] = useState<boolean>(false);
  const [tasksLoading, setTasksLoading] = useState<boolean>(false);

  useEffect(() => {
    (async function getEthWallet() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      // Load deployed contract into the DApp
      const tasksListContract = new web3.eth.Contract(tasksAbi, tasksAddress);
      setTasksList(tasksListContract);

      const tasksCount = await tasksListContract.methods.getTasksCount().call();

      setTasksLoading(true);
      const newTasks: any[] = [];
      for (let i = 1; i <= tasksCount; i++) {
        const task = await tasksListContract.methods.tasks(i).call();
        newTasks.push(task);
      }
      setTasks(newTasks);
      setTasksLoading(false);
    })();
  }, []);

  const handleTaskAddClick = () => {
    if (newTaskText.length < 1) {
      return;
    }

    setAddingTask(true);
    tasksList.methods.createTask(newTaskText).send({ from: account })
      .once("receipt", (receipt: any) => {
        setAddingTask(false);
        console.log(receipt);
      });

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