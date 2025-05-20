import React, { useState } from "react";
import AddItem from './AddItem';
import ToDoList from './ToDoList';
import styles from "../styles/App.module.css";
import listStyles from "../styles/List.module.css";

function List({ items, addTaskToList, deleteTask, toggleTaskComplete, toggleListComplete, deleteList }) {
  const [openListId, setOpenListId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenListId(prevId => (prevId === id ? null : id));
  };

  return (
    <div>
      {items.map((list) => {
        return (
          <div key={list.id} className={`${listStyles.accordionSection}`}>
            <div className={listStyles.accordionHeader}>
              <button className={listStyles.accordionToggle} onClick={() => toggleAccordion(list.id)}>
                <span className={list.completed ? listStyles.listCompleted : ''}>
                  {list.text}
                </span>
              </button>
              <button
                className={`${styles.taskText} `}
                onClick={() => toggleListComplete(list.id)}>
                Done
              </button>
              <button
                className={`${styles.taskText} `}
                onClick={() => deleteList(list.id)}>
                Delete
              </button>
            </div>
            <div>

            </div>

            {openListId === list.id && (
              <div className={listStyles.accordionContent}>
                <AddItem updateTaskList={(task) => addTaskToList(list.id, task)} />
                {list.tasks.length === 0 ? (
                  <div className={styles.noTasksYet}>No tasks yet! Add some</div>
                ) : (
                  <ToDoList
                    items={list.tasks}
                    DeleteItem={(taskId) => deleteTask(list.id, taskId)}
                    ToggleComplete={(taskId) => toggleTaskComplete(list.id, taskId)} />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default List;
