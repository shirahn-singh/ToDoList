import { useEffect, useState } from 'react';
import { createList } from "../firebaseFunctions/firestoreDbOperations";
import { auth } from "../firebase"; 

function useListGroup() {
  const [listGroup, setListGroup] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('listGroupData');
    if (stored) {
      setListGroup(JSON.parse(stored));
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem('listGroupData', JSON.stringify(listGroup));
    }
  }, [listGroup, hasLoaded]);



  async function addNewListGroup(task) {
    setListGroup(prev => [...prev, task]);
  
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        await createList(currentUser.uid, task.text);
      } catch (err) {
        console.error("Error creating list in Firestore:", err);
      }
    }
  }

  function addTaskToList(listId, task) {
    setListGroup(prev =>
      prev.map(list =>
        list.id === listId
          ? { ...list, tasks: [...list.tasks, task] }
          : list
      )
    );
  }

  function deleteTaskFromList(listId, taskId) {
    setListGroup(prev =>
      prev.map(list =>
        list.id === listId
          ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) }
          : list
      )
    );
  }


  function toggleTaskCompleteInList(listId, taskId) {
    setListGroup(prev =>
      prev.map(list =>
        list.id === listId
          ? {
            ...list,
            tasks: list.tasks.map(task =>
              task.id === taskId
                ? { ...task, completed: !task.completed }
                : task
            )
          }
          : list
      )
    );

    moveToEnd(listId, taskId);
  }

  function moveToEnd(listId, taskId) {

    setListGroup(prev =>
      prev.map(list => {
        if (list.id !== listId) {
          return list;
        }

        if (list.tasks.length == 0) {
          return list;
        }

        const taskToMove = list.tasks.find(task => task?.id === taskId);

        if (!taskToMove || !taskToMove.completed) {
          return list;
        }

        const remainingTasks = list.tasks.filter((task) => (task?.id !== taskId));
        return {
          ...list,
          tasks: [...remainingTasks, taskToMove]
        };

      })
    )
  }



  function toggleListComplete(listId) {
    setListGroup((prev) => prev.map(listItem =>
      listId == listItem.id ? {
        ...listItem,
        completed: !listItem.completed,
        tasks: listItem.tasks.map((task) => ({
          ...task,
          completed: !listItem.completed
        }))
      } : listItem
    ));
  }

  function deleteList(listId) {
    setListGroup(prev =>
      prev.filter(listItem => listItem.id !== listId)
    );
  }

  return {
    listGroup,
    setListGroup,
    addNewListGroup,
    addTaskToList,
    deleteTaskFromList,
    toggleTaskCompleteInList,
    toggleListComplete,
    deleteList
  };

}

export default useListGroup;