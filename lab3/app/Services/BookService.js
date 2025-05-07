import { addDoc, getDocs, deleteDoc, updateDoc, collection, doc } from "firebase/firestore";
import { firestore } from "./init";

const col = collection(firestore, "books");

export const createBook = async (book) => {
    const result = await addDoc(col, book);
    return result;
};

export const fetchBooks = async () => {
    const colRef = collection(firestore, "books");
    const querySnapshot = await getDocs(colRef);
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};

export const deleteBook = async (bookId) => {
    const bookRef = doc(firestore, "books", bookId);
    await deleteDoc(bookRef);
};

export const updateBook = async (bookId, data) => {
    const bookRef = doc(firestore, "books", bookId);
    await updateDoc(bookRef, data);
};