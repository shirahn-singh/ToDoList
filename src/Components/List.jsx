import React from "react";
import ListAccordion from './ListAccordion';

function List({ items, addTaskToList, deleteTask, toggleTaskComplete, toggleListComplete, deleteList }) {
  return (
    <div>
      {items.map(list => (
        <ListAccordion
          key={list.id}
          list={list}
          addTaskToList={addTaskToList}
          deleteTask={deleteTask}
          toggleTaskComplete={toggleTaskComplete}
          toggleListComplete={toggleListComplete}
          deleteList={deleteList}
        />
      ))}
    </div>
  );
}

export default List;
