import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
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

