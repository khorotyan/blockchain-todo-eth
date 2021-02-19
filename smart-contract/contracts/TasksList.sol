// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TasksList {
    uint tasksCount;

    constructor() public {
      tasksCount = 0;
    }

    function getTasksCount() public view returns (uint) {
      return tasksCount;
    }
}