// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TasksList {
    uint public tasksCount = 0;

    struct Task {
      uint id;
      string text;
      bool isCompleted;
      bool isRemoved;
    }

    mapping(uint => Task) public tasks;

    event TaskCreated(
      uint id,
      string text,
      bool isCompleted,
      bool isRemoved
    );

    event TaskCompleted(
      uint id,
      bool isCompleted
    );

    constructor() public {
      createTask("Write your everyday tasks in here.");
      createTask("Stay productive by tracking your tasks.");
      createTask("Have fun!");
    }

    function createTask(string memory _text) public {
      tasksCount++;
      tasks[tasksCount] = Task(tasksCount, _text, false, false);

      emit TaskCreated(tasksCount, _text, false, false);
    }

    function toggleCompleted(uint _id) public {
      Task memory _task = tasks[_id];
      _task.isCompleted = !_task.isCompleted;
      tasks[_id] = _task;

      emit TaskCompleted(_id, _task.isCompleted);
    }
}