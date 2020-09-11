import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import InputField from "./Components/InputField";

const rootElement = document.getElementById("root");

const App = () => {
  const [newTask, setNewTask] = useState("");
  const onInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const [tasks, setTasks] = useState([
    { task: "Wash the car", isComplete: false, priority: "low" },
    { task: "Do Gardening", isComplete: false, priority: "med" },
    { task: "Go running", isComplete: true, priority: "med" },
    { task: "Buy groceries", isComplete: false, priority: "high" },
    { task: "Hit the Gym", isComplete: false, priority: "low" }
  ]);

  const addTask = () => {
    const taskObj = {
      task: newTask,
      isComplete: false,
      priority: "low"
    };
    setTasks(tasks.concat(taskObj));
  };

  const toggleTask = (index) => {
    setTasks(
      tasks.map((task, taskIndex) => {
        if (taskIndex === index) {
          return { ...task, isComplete: !task.isComplete };
        }
        return task;
      })
    );
  };

  const pending = tasks.filter((taskObj) => {
    return !taskObj.isComplete;
  });

  const complete = tasks.filter((taskObj) => {
    return taskObj.isComplete;
  });

  const lowPriority = tasks.filter((taskObj) => {
    return taskObj.priority === "low";
  });

  const medPriority = tasks.filter((taskObj) => {
    return taskObj.priority === "med";
  });

  const highPriority = tasks.filter((taskObj) => {
    return taskObj.priority === "high";
  });
  const delTask = (index) => {
    setTasks(tasks.filter((task, taskIndex) => taskIndex !== index));
  };

  const changePriorityTask = (index) => {
    setTasks(
      tasks.map((task, taskIndex) => {
        if (taskIndex === index) {
          if (task.priority === "low") {
            return {
              ...task,
              isComplete: task.isComplete,
              priority: "med"
            };
          } else if (task.priority === "med") {
            return {
              ...task,
              isComplete: task.isComplete,
              priority: "high"
            };
          } else if (task.priority === "high") {
            return {
              ...task,
              isComplete: task.isComplete,
              priority: "low"
            };
          }
        }
        return task;
      })
    );
  };

  return (
    <Fragment>
      <h1>To-Do List</h1>
      <InputField
        newTask={newTask}
        onInputChange={onInputChange}
        addTask={addTask}
      />
      <hr></hr>
      <label>Low: {lowPriority.length}</label>
      &nbsp; &nbsp;&nbsp;&nbsp;
      <label>Medium: {medPriority.length}</label>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <label>High: {highPriority.length}</label>
      <hr></hr>
      <table>
        <tbody>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Delete</th>
          </tr>
          {tasks.map((taskObj, index) => {
            const clickedTask = () => {
              toggleTask(index);
            };
            const deleteTask = () => {
              delTask(index);
            };
            const priorityTask = () => {
              changePriorityTask(index);
            };
            return (
              <tr key={index}>
                <td>
                  <span>{taskObj.task}</span>
                </td>
                <td>
                  <button
                    style={{ background: "transparent", border: "0px" }}
                    onClick={clickedTask}
                  >
                    {taskObj.isComplete ? "✔️" : "⏱"}
                  </button>
                </td>
                <td>
                  {taskObj.priority === "high" ? (
                    <button className="btn-danger" onClick={priorityTask}>
                      High
                    </button>
                  ) : taskObj.priority === "med" ? (
                    <button className="btn-warning" onClick={priorityTask}>
                      Medium
                    </button>
                  ) : (
                    <button className="btn-success" onClick={priorityTask}>
                      Low
                    </button>
                  )}
                </td>
                <td onClick={deleteTask}>
                  <button style={{ background: "transparent", border: "0px" }}>
                    <span role="img" aria-label="trash">
                      🗑️
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr></hr>
      <label>Pending:{pending.length}</label>
      &nbsp; &nbsp; &nbsp; &nbsp;
      <label>Completed: {complete.length}</label>
      <hr></hr>
    </Fragment>
  );
};

ReactDOM.render(<App />, rootElement);
