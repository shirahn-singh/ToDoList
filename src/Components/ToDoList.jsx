import { useState } from "react";
import React from "react";
import ToDoListItem from "./ToDoListItem";

function ToDoList({items, DeleteItem, ToggleComplete}) {
    return (
        <>
            <div className='items'>
                {
                    items.map((item) => (
                       <ToDoListItem key={item.id} item={item} onDelete={DeleteItem} onComplete={()=>{ToggleComplete(item.id)}}/>
                    ))
                }
            </div>
        </>
    );
}

export default ToDoList;