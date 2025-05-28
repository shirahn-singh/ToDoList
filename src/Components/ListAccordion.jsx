import React, { useState } from "react";
import AddItem from './AddItem';
import ToDoList from './ToDoList';
import listStyles from "../styles/ListAccordion.module.css";

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
        <div className={listStyles.buttonWrapper}>
        <button className={listStyles.listButton} onClick={() => toggleListComplete(list.id)}>Done</button>
        <button className={listStyles.listButton} onClick={() => deleteList(list.id)}>Delete</button>
        </div>
      </div>

      {isOpen && (
        <div className={listStyles.accordionContent}>
          <AddItem updateTaskList={task => addTaskToList(list.id, task)} />
          {list.tasks.length === 0 ? (
            <div className={listStyles.noTasksYet}>No tasks yet! Add some</div>
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
