const assert = require("assert");

const TasksList = artifacts.require('./TasksList.sol');

contract("TasksList", (accounts) => {
  before(async () => {
    this.tasksList =  await TasksList.deployed();
  });

  it("Deploys successfully", async () => {
    const address = await this.tasksList.address;

    assert.notStrictEqual(address, 0x0);
    assert.notStrictEqual(address, "");
    assert.notStrictEqual(address, null);
    assert.notStrictEqual(address, undefined);
  });

  it("Lists tasks", async () => {
    const tasksCount = await this.tasksList.tasksCount();
    const firstTask = await this.tasksList.tasks(1);

    assert.strictEqual(firstTask.id.toNumber(), 1);
    assert.strictEqual(firstTask.text, "Write your everyday tasks in here.");
    assert.strictEqual(firstTask.isCompleted, false);
    assert.strictEqual(tasksCount.toNumber(), 3);
  });

  it("Creates tasks", async() => {
    const taskText = "4th Task";
    const result = await this.tasksList.createTask(taskText);
    const tasksCount = await this.tasksList.tasksCount();
    const event = result.logs[0].args;

    assert.strictEqual(tasksCount.toNumber(), 4);
    assert.strictEqual(event.id.toNumber(), 4);
    assert.strictEqual(event.text, taskText);
    assert.strictEqual(event.isCompleted, false);
    assert.strictEqual(event.isRemoved, false);
  });
});