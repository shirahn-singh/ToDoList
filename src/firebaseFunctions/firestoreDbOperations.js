import { db } from "../firebase";
import {
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    query,
    where,
    doc,
    deleteDoc,
    updateDoc
} from "firebase/firestore";

//#region Gets
export const getUserLists = async (userId) => {
    const q = query(collection(db, "lists"), where("userId", "==", userId));
    const snapshot = await getDocs(q);

    const userLists = await Promise.all(
        snapshot.docs.map(async (doc) => {
            const data = doc.data();
            const tasks = await getTasksForList(doc.id);

            return {
                id: doc.id,
                text: data.text || data.title,
                tasks,
                completed: data.completed || false,
                ...data
            };
        })
    );

    return userLists;
};

export const getTasksForList = async (listId) => {
    const taskSnapshot = await getDocs(collection(db, "lists", listId, "tasks"));
    return taskSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

//#endregion

//#region Creates
export const createList = async (userId, text) => {
    const ref = await addDoc(collection(db, "lists"), {
        userId,
        text,
        published: false,
        createdAt: serverTimestamp()
    });
    return ref.id;
};

export const addTaskToListInFirestore = async (listId, task) => {
    const taskWithTimestamp = {
        ...task,
        createdAt: new Date()
    };

    const taskRef = collection(db, "lists", listId, "tasks");
    await addDoc(taskRef, taskWithTimestamp);
};
//#endregion

//#region Deletes
export const deleteTaskFromListInFirestore = async (listId, taskId) => {
    const ref = doc(db, "lists", listId, "tasks", taskId);
    await deleteDoc(ref);
};

export const deleteListFromFirestore = async (listId) => {
    const ref = doc(db, "lists", listId);
    await deleteDoc(ref);
};

export const deleteListWithTasks = async (listId) => {
    const taskSnapshot = await getDocs(collection(db, "lists", listId, "tasks"));
  
    const deletions = taskSnapshot.docs.map((doc) =>
      deleteTaskFromListInFirestore(listId, doc.id)
    );
    await Promise.all(deletions);
  
    await deleteListFromFirestore(listId);
  };
//#endregion


//#region Updates
export const updateTaskInFirestore = async (listId, task) => {
    const ref = doc(db, "lists", listId, "tasks", task.id);
    await updateDoc(ref, { completed: task.completed });
};
//#endregion