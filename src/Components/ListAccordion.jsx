import React, { useState } from "react";
import AddItem from './AddItem';
import ToDoList from './ToDoList';
import styles from "../styles/App.module.css";
import listStyles from "../styles/List.module.css";

function ListAccordion({ list, addTaskToList, deleteTask, toggleTaskComplete, toggleListComplete, deleteList }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(prev => !prev);

  return (
    <div className={listStyles.accordionSection}>
      <div className={listStyles.accordionHeader}>
        <button className={listStyles.accordionToggle} onClick={toggleAccordion}>
          <span className={list.completed ? listStyles.listCompleted : ''}>
            {list.text}
          </span>
        </button>
        <button className={styles.taskText} onClick={() => toggleListComplete(list.id)}>Done</button>
        <button className={styles.taskText} onClick={() => deleteList(list.id)}>Delete</button>
      </div>

      {isOpen && (
        <div className={listStyles.accordionContent}>
          <AddItem updateTaskList={task => addTaskToList(list.id, task)} />
          {list.tasks.length === 0 ? (
            <div className={styles.noTasksYet}>No tasks yet! Add some</div>
          ) : (
            <ToDoList
              items={list.tasks}
              DeleteItem={taskId => deleteTask(list.id, taskId)}
              ToggleComplete={taskId => toggleTaskComplete(list.id, taskId)}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ListAccordion;
