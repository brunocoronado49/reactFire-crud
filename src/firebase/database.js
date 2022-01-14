import {
    collection,
    addDoc,
    updateDoc,
    onSnapshot,
    deleteDoc,
    doc,
    getDoc,
    getDocs
} from "firebase/firestore";
import {database} from './configuration';

const collectionName = "Links"

export const saveLink = (newLink) => 
    addDoc(collection(database, collectionName), newLink);

export const updateLink = (id, updatedFields) => 
    updateDoc(doc(database, collectionName, id), updatedFields);

export const onGetLinks = (callback) =>
    onSnapshot(collection(database, collectionName), callback);

export const deleteLink = (id) => 
    deleteDoc(doc(database, collectionName, id));

export const getLink = (id) =>
    getDoc(doc(database, collectionName, id));

export const getLinks = () => 
    getDocs(collection(database, collectionName))

