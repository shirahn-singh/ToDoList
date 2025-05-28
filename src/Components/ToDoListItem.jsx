import React from "react";
import styles from '../styles/ToDoListItem.module.css';

function ToDoListItem({ item, onDelete, onComplete }) {
    return (
        <div className={styles.toDoListItem}>
        <div className={`${styles.taskText} ${item.completed ? styles.toDoListItemCompleted : ''}`}>
          {item.text}
        </div>
      
        <div className={styles.buttonGroup}>
          <button onClick={() => onComplete(item.id)}>
            {!item.completed ? "Done" : "Whoops"}
          </button>
          <button onClick={() => onDelete(item.id)}>Delete</button>
        </div>
      </div>
      
    );
}

export default ToDoListItem;