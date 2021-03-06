// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract TasksList {
  uint tasksCount = 0;
  uint archivedCount = 0;

  struct Task {
    uint id;
    string text;
    bool isCompleted;
    bool isArchived;
  }

  mapping(uint => Task) public tasks;

  event TaskCreated(
    uint id,
    string text,
    bool isCompleted,
    bool isArchived
  );

  event TaskCompleted(
    uint id,
    bool isCompleted
  );

  event TaskArchived(
    uint id,
    bool isArchived
  );

  event TaskTextModified(
    uint id,
    string text
  );

  constructor() public {
    createTask("Write your everyday tasks in here.");
    createTask("Stay productive by tracking your tasks.");
    createTask("Have fun!");
  }

  function getTasksCount() public view returns (uint) {
    return tasksCount;
  }

  function getTasks() public view returns (Task[] memory) {
    Task[] memory _taskArr = new Task[](tasksCount - archivedCount);

    uint _count = 0;
    for (uint i = 0; i < tasksCount; i++) {
      Task memory _task = tasks[i + 1]; 
      
      if (!_task.isArchived) {
        _taskArr[_count] = _task;
        _count++;
      }
    }

    return _taskArr;
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

  function toggleArchived(uint _id) public {
    Task memory _task = tasks[_id];
    _task.isArchived = !_task.isArchived;
    tasks[_id] = _task;

    if (_task.isArchived) {
      archivedCount++;
    } else {
      archivedCount--;
    }

    emit TaskArchived(_id, _task.isArchived);
  }

  function modifyTaskText(uint _id, string memory _newText) public {
    Task memory _task = tasks[_id];
    _task.text = _newText;
    tasks[_id] = _task;

    emit TaskTextModified(_id, _newText);
  }
}