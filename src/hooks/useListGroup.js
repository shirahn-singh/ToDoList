import { useEffect, useState } from 'react';
import { createList, getUserLists, addTaskToListInFirestore, deleteTaskFromListInFirestore, updateTaskInFirestore, deleteListWithTasks  } from "../firebaseFunctions/firestoreDbOperations";
import { auth } from "../firebase";

function useListGroup(user) {
  const [listGroup, setListGroup] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  //#region useEffects
  useEffect(() => {
    const stored = localStorage.getItem('listGroupData');
    if (stored) {
      setListGroup(JSON.parse(stored));
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded && !auth.currentUser) {
      localStorage.setItem('listGroupData', JSON.stringify(listGroup));
    }
  }, [listGroup, hasLoaded]);

  useEffect(() => {
    const loadLists = async () => {
      if (user) {
        try {
          const userLists = await getUserLists(user.uid);
          setListGroup(userLists);
          localStorage.removeItem("listGroupData");
        } catch (err) {
          console.error("Error loading user lists:", err);
        }
      }
    };

    loadLists();
  }, [user]);
  //#endregion

  async function addNewListGroup(task) {

    const newList = {
      ...task,
      tasks: task.tasks || [],
      completed: task.completed || false
    };

    setListGroup(prev => [...prev, newList]);

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

    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        addTaskToListInFirestore(listId, task);
      } catch (err) {
        console.error("Error adding task to Firestore:", err);
      }
    }
  }

  function deleteTaskFromList(listId, taskId) {
    setListGroup(prev =>
      prev.map(list =>
        list.id === listId
          ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) }
          : list
      )
    );

    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        deleteTaskFromListInFirestore(listId, taskId);
      } catch (err) {
        console.error("Error deleting task from Firestore:", err);
      }
    }
  }

  function toggleTaskCompleteInList(listId, taskId) {
    const currentUser = auth.currentUser;
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
    if (currentUser) {
      const list = listGroup.find(l => l.id === listId);
      const task = list?.tasks.find(t => t.id === taskId);
      if (task) {
        updateTaskInFirestore(listId, {
          ...task,
          completed: !task.completed
        });
      }
    }
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
    const currentUser = auth.currentUser;

    const targetList = listGroup.find(list => list.id === listId);
    const newCompletedState = !targetList?.completed;

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

    if (currentUser && targetList) {
      targetList.tasks.forEach(task =>
        updateTaskInFirestore(listId, {
          ...task,
          completed: newCompletedState
        })
      );
    }
  }

  function deleteList(listId) {
    setListGroup(prev =>
      prev.filter(listItem => listItem.id !== listId)
    );

    const currentUser = auth.currentUser;
    if (currentUser) {
      deleteListWithTasks(listId);
    }
  }

  function clearAllLists() {
    setListGroup([]);
  }

  return {
    listGroup,
    setListGroup,
    addNewListGroup,
    addTaskToList,
    deleteTaskFromList,
    toggleTaskCompleteInList,
    toggleListComplete,
    deleteList,
    clearAllLists
  };

}

export default useListGroup;