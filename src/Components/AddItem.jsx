import React, { useState } from "react";


function AddItem({updateTaskList}) {
    const [task, setCurrentTask] = useState("");

    function addToList() {
        if (task.length > 0) {
            updateTaskList({
                id: Date.now(),
                text: task,
                completed: false
              });
              
            setCurrentTask("");
        }
        else {
            alert("Please type something before adding");
        }
    }

    return (
        <>
            <input onChange={(e) => { setCurrentTask(e.target.value) }} value={task}></input>
            <button onClick={addToList} disabled={task.length == 0}> Add to list</button>
        </>
    );
}

export default AddItem;