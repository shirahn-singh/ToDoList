import React, { useState } from "react";


function ToDoListItem({ item, onDelete, onComplete }) {
    return (
        <div key={item.id} className= {item.completed? "to-do-list-item-completed" : 'to-do-list-item'}>
            <div>{item.text}</div>
            <button onClick ={onComplete}> {!item.completed ? "Done" : "Whoops"}</button>
            <button onClick={()=>{onDelete(item.id)}}>Delete</button>
        </div>
    );
}

export default ToDoListItem;