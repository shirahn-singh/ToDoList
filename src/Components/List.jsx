import React, { useState } from "react";
import AddItem from './AddItem';
import ToDoList from './ToDoList';
import styles from "../styles/App.module.css";
import listStyles from "../styles/List.module.css"; 

function List({ items, addTaskToList, deleteTask, toggleTaskComplete }) {
  const [openListId, setOpenListId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenListId(prevId => (prevId === id ? null : id));
  };

  return (
    <div>
      {items.map((list) => (
        <div key={list.id} className={listStyles.accordionSection}>
          <button
            className={listStyles.accordionToggle}
            onClick={() => toggleAccordion(list.id)}
          >
            {list.text}
          </button>

          {openListId === list.id && (
            <div className={listStyles.accordionContent}>
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
          )}
        </div>
      ))}
    </div>
  );
}

export default List;
