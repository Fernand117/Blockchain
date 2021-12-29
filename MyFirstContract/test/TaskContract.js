const TasksContract = artifacts.require("TasksContract");

contract("TasksContract", () => {
    before(async() => {
        this.tasksContract = await TasksContract.deployed();
    });

    it('migrate deployed successfully', async() => {
        const address = this.tasksContract.address;

        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    });

    it('get task list', async() => {
        const counter = await this.tasksContract.taskCounter();
        const listTask = await this.tasksContract.tasks(counter);

        assert.equal(listTask.id.toNumber(), counter);
        assert.equal(listTask.title, "mi primer tarea de ejemplo");
        assert.equal(listTask.description, "tengo que hacer algo");
        assert.equal(listTask.done, false);
    });

    it('create task', async() => {
        const resultTask = await this.tasksContract.createTask("some task", "description two");
        const taskEvent = resultTask.logs[0].args;
        const counter = await this.tasksContract.taskCounter();

        assert.equal(counter, 2);
        assert.equal(taskEvent.id.toNumber(), 2);
        assert.equal(taskEvent.title, "some task");
        assert.equal(taskEvent.description, "description two");
        assert.equal(taskEvent.done, false);
    });

    it('toogle check', async() => {
        const result = await this.tasksContract.toogleDone(1);
        const taskEvent = result.logs[0].args;
        const task = await this.tasksContract.tasks(1);

        assert.equal(task.done, true);
        assert.equal(taskEvent.done, true);
        assert.equal(taskEvent.id, 1);
    });
});