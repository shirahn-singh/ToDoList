import React, { useState } from "react";


function ToDoListItem({ item, onDelete }) {

    const [task, setTask] = useState(item);

    return (
        <div key={item.id} className='to-do-list-item'>
            <input checked = {item.completed} type='radio' readOnly />
            <div>{item.text}</div>
            <button onClick={()=>{onDelete(item.id)}}>Delete</button>
        </div>
    );
}

export default ToDoListItem;