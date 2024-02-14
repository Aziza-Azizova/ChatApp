import { createContext, useState } from "react";
import aleksandr from '../assets/avatars/aleksandr.svg';
import andy from '../assets/avatars/andy.svg';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export const Context = createContext(); 

export default function ContextProvider({children}) {
    const [selectedUser, setSelectedUser] = useState({});
    const [message, setMessage] = useState('');
    const [displayMessages, setDisplayMessages] = useState([]);

    async function getMessageFromFirestore() {
        const getMessages = await getDocs(collection(db, 'messages'));
        const tempArr = [];
        getMessages.forEach((doc) => {
            tempArr.push(doc.data());
        });
        const sortedMessages = tempArr.slice().sort((a, b) => {
            const timeA = a.date.split(':').map(Number);
            const timeB = b.date.split(':').map(Number);
        
            if (timeA[0] !== timeB[0]) {
              return timeA[0] - timeB[0]; // Compare hours
            }
            if (timeA[1] !== timeB[1]) {
              return timeA[1] - timeB[1]; // Compare minutes
            }
            return timeA[2] - timeB[2]; // Compare seconds
        });
        setDisplayMessages(sortedMessages);
    }
    
    let users = [
        {
            id: 1,
            name: 'Aleksandr',
            avatar: aleksandr,
        },
        {
            id: 2,
            name: 'Jason',
            avatar: andy,
        },
    ];


    return (
        <Context.Provider value={{ users, selectedUser, setSelectedUser, message, setMessage, getMessageFromFirestore, displayMessages, db }}>
            {children}
        </Context.Provider>
    )
}
