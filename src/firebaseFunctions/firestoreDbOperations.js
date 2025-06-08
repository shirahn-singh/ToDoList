import { db } from "../firebase";
import {
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    query,
    where
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

//#region Writes
export const addTaskToListInFirestore = async (listId, task) => {
    const taskWithTimestamp = {
        ...task,
        createdAt: new Date()
    };

    const taskRef = collection(db, "lists", listId, "tasks");
    await addDoc(taskRef, taskWithTimestamp);
};

export const createList = async (userId, text) => {
    const ref = await addDoc(collection(db, "lists"), {
        userId,
        text,
        published: false,
        createdAt: serverTimestamp()
    });
    return ref.id;
};
//#endregion