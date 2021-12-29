// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract TasksContract {

    uint public taskCounter = 0;

    constructor () {
        createTask("mi primer tarea de ejemplo", "tengo que hacer algo");
    }

    event TaskCreated(
        uint id,
        string title,
        string description,
        bool done,
        uint createAt
    );

    event TaskToogleDone(uint id, bool done);

    struct Task {
        uint256 id;
        string title;
        string description;
        bool done;
        uint256 createAt;
    }

    mapping (uint256 => Task) public tasks;

    function createTask(string memory _title, string memory _description) public {
        taskCounter++;
        tasks[taskCounter] = Task(taskCounter, _title, _description, false, block.timestamp);
        emit TaskCreated(taskCounter, _title, _description, false, block.timestamp);
    }

    function toogleDone(uint _id) public {
        Task memory _tasks = tasks[_id];
        _tasks.done = !_tasks.done;
        tasks[_id] = _tasks;
        emit TaskToogleDone(_id, _tasks.done);
    }
}