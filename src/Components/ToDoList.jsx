import { useState } from "react";
import React from "react";
import ToDoListItem from "./ToDoListItem";

function ToDoList({items, DeleteItem}) {
    return (
        <>
            <div className='items'>
                {
                    items.map((item) => (
                       <ToDoListItem key={item.id} item={item} onDelete={DeleteItem}/>
                    ))
                }
            </div>
        </>
    );
}

export default ToDoList;