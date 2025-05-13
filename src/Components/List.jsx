import React from "react";
import AddItem from './AddItem';
import ToDoList from './ToDoList';
import styles from "../styles/App.module.css";

function List({ items, addTaskToList, deleteTask, toggleTaskComplete }) {
  return (
    <div>
      {items.map((list) => (
        <div key={list.id}>
          <h2>{list.text}</h2>
          <AddItem updateTaskList={(task) => addTaskToList(list.id, task)} />
          {list.tasks.length === 0 ? (
            <div className={styles.noTasksYet}>No tasks yet! Add some</div>
          ) : (
            <ToDoList
              items={list.tasks}
              DeleteItem={(taskId) => deleteTask(list.id, taskId)}
              ToggleComplete={(taskId) => toggleTaskComplete(list.id, taskId)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default List;
