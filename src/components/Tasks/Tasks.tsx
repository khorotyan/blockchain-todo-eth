import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Web3 from "web3";

import { Button, CircularProgress } from "../../atoms";
import Header from "../Header";
import Task from "./Task";
import Create from "./Create";
import { tasksAddress, tasksAbi } from "../../constants/config";

import "./Tasks.scss";

interface TaskItem {
  id: string;
  text: string;
  isCompleted: boolean;
  isArchived: boolean;
  0: string;
  1: string;
  2: boolean;
  3: boolean;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [newTaskText, setNewTaskText] = useState<string>("");
  const [account, setAccount] = useState<string>("");
  const [tasksList, setTasksList] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [tasksLoading, setTasksLoading] = useState<boolean>(false);

  useEffect(() => {
    (async function getEthWallet() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      // Load deployed contract into the DApp
      const tasksListContract = new web3.eth.Contract(tasksAbi, tasksAddress);
      setTasksList(tasksListContract);

      setTasksLoading(true);
      const tasks = await tasksListContract.methods.getTasks().call();
      
      const newTasks: any[] = [];
      for (let i = 0; i < tasks.length; i++) {
        const task = { ...tasks[i] };
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

    setLoading(true);
    tasksList.methods.createTask(newTaskText).send({ from: account })
      .once("receipt", (receipt: any) => {
        const newTaskId = receipt.events.TaskCreated.returnValues.id;

        const newTask: TaskItem = {
          id: newTaskId,
          text: newTaskText,
          isCompleted: false,
          isArchived: false,
          0: newTaskId,
          1: newTaskText,
          2: false,
          3: false,
        };
    
        const newTasks = [...tasks, newTask];
        setTasks(newTasks);
        setNewTaskText("");

        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
      });
  }

  const handleTaskCheckClick = (id: string) => {
    const tasksCopy = [...tasks];
    const task = tasksCopy.find((task: any) => task.id === id);

    if (task) {
      setLoading(true);
      tasksList.methods.toggleCompleted(id).send({ from: account })
        .once("receipt", (receipt: any) => {
          task.isCompleted = !task.isCompleted;
          setTasks(tasksCopy);
          setLoading(false);
        })
        .catch((err: any) => {
          setLoading(false);
        });
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
    const task = tasks.find((task: any) => task.id === id);

    if (task) {
      setLoading(true);
      tasksList.methods.toggleArchived(id).send({ from: account })
        .once("receipt", (receipt: any) => {
          const tasksCopy = tasks.filter((task: any) => task.id !== id);
          setTasks(tasksCopy);
          setLoading(false);
        })
        .catch((err: any) => {
          setLoading(false);
        });
    }
  }

  const handleTaskTextChangeOnBlur = (id: string, newText: string) => {
    const tasksCopy = [...tasks];
    const task = tasksCopy.find((task: any) => task.id === id);

    if (task && task.text !== task[1]) {
      setLoading(true);
      tasksList.methods.modifyTaskText(id, newText).send({ from: account })
        .once("receipt", (receipt: any) => {
          task[1] = newText;
          setTasks(tasksCopy);
          setLoading(false);
        })
        .catch((err: any) => {
          task.text = task[1];
          setTasks(tasksCopy);
          setLoading(false);
        });
    }
  }

  return <div className="Tasks">
    <div className="Tasks__Wrapper">
      <Header margin="0 0 16px 0" />
      <div className="Tasks__Wrapper__Body">
        {tasksLoading
          ?
          <div className="Tasks__Wrapper__Body__LoadingContainer">
            <CircularProgress margin="0 0 24px 0" />
          </div>
          :
          tasks.filter(task => task.isArchived === false).map((task) =>
            <Task
              key={task.id}
              text={task.text}
              isCompleted={task.isCompleted}
              onCheckClick={() => handleTaskCheckClick(task.id)}
              onTextChange={(newText: string) => handleTaskTextChange(newText, task.id)}
              onInputBlur={((newText: string) => handleTaskTextChangeOnBlur(task.id, newText))}
              onTaskRemove={() => handleTaskRemove(task.id)}
            />
          )
        }

        <Create
          text={newTaskText}
          onTextChange={(newText: string) => setNewTaskText(newText)}
        />
      </div>
      <div className="Tasks__Wrapper__ButtonContainer">
        <Button label="Add Task" loading={loading} onClick={handleTaskAddClick} />
      </div>
    </div>
  </div>;
};

export default Tasks;