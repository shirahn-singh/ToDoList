import { db } from "../firebase";
import {
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    query,
    where
} from "firebase/firestore";

export const createList = async (userId, text) => {
    const ref = await addDoc(collection(db, "lists"), {
        userId,
        text,
        published: false,
        createdAt: serverTimestamp()
    });
    return ref.id;
};

export const getUserLists = async (userId) => {
    const q = query(collection(db, "lists"), where("userId", "==", userId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        text: doc.data().title,
        tasks: [],
        completed: false,
        ...doc.data()
    }));
};

export const addTaskToListInFirestore = async (listId, task) => {
    const taskWithTimestamp = {
        ...task,
        createdAt: new Date()
    };

    const taskRef = collection(db, "lists", listId, "tasks");
    await addDoc(taskRef, taskWithTimestamp);
};