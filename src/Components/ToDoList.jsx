import { useState } from "react";
import React from "react";
import ToDoListItem from "./ToDoListItem";
import styles from "../styles/ToDoList.module.css";
import { Stack } from '@mui/material';
function ToDoList({ items, DeleteItem, ToggleComplete }) {
    return (
        <>
            <Stack spacing={2}>
                {items.map((item) => (
                    <ToDoListItem
                        key={item.id}
                        item={item}
                        onDelete={DeleteItem}
                        onComplete={() => ToggleComplete(item.id)}
                    />
                ))}
            </Stack>
        </>
    );
}

export default ToDoList;