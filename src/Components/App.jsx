import './App.css'
import AddItem from './AddItem';
import ToDoList from './ToDoList';
import React, {useState} from 'react';

function App() {

  const [taskList, setTaskList] = useState([
    { id: 1, text: "This is task 1", completed: false },
    { id: 2, text: "This is task 2", completed: false }
]);

function deleteTask(idToDelete) {
  setTaskList(prev => prev.filter(task => task.id !== idToDelete));
}

function addNewTask(task){
setTaskList((prev)=>[...prev, task]);
}

  return (
    <>
      <h1>Hello, I am a to do list. Add stuff to me now.</h1>
      <AddItem updateTaskList={addNewTask} />
      <ToDoList items={taskList} DeleteItem={deleteTask}/>
    </>
  )
}

export default App