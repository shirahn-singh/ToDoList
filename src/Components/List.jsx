import React, {useState} from "react";

import AddItem from './AddItem';
import ToDoList from './ToDoList';
import styles from "../styles/App.module.css";

function List() {
    const [taskList, setTaskList] = useState([]);

    function deleteTask(idToDelete) {
      setTaskList(prev => prev.filter(task => task.id !== idToDelete));
    }
  
    function toggleTaskComplete(idToToggle) {
      setTaskList(prev =>
        prev.map(task =>
          task.id === idToToggle
            ? { ...task, completed: !task.completed }
            : task
        )
      );
    }
  
    function addNewTask(task) {
      setTaskList((prev) => [...prev, task]);
    }

    return (
        <div>
            <AddItem updateTaskList={addNewTask} />
            {taskList.length === 0
              ? <div className = {styles.noTasksYet}>No tasks yet! Add some</div>
              : <ToDoList items={taskList} DeleteItem={deleteTask} ToggleComplete = {toggleTaskComplete} />}
        </div>
      )
}

export default List;