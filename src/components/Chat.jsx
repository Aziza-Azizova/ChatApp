import React, { useContext, useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import sendIcon from '../assets/icons/sendIcon.svg';
import cameraIcon from '../assets/icons/camera.svg';
import { Context } from '../context/Context';

export default function Chat({ user }) {
    const [typing, setTyping] = useState(false);

    const { selectedUser, message, setMessage, getMessageFromFirestore, displayMessages, db } = useContext(Context);
    const ref = collection(db, 'messages');

    useEffect(() => {
        getMessageFromFirestore();
    }, [])

    async function handleSave(e) {
        e.preventDefault();

        let data = {
            userId: user.id,
            username: user.name,
            message: message,
            date: new Date().toLocaleTimeString()
        }

        try {
            addDoc(ref, data)
        } catch (e) {
            console.log(e);
        }

        setMessage('');
        getMessageFromFirestore();
    }

    function inputChange(e) {
        setMessage(e.target.value);
        setTyping(true);
    }


    return (
        <div className='chat'>
            <div className="chat__nav">
                <div className="chat__user">
                    <img src={user.avatar} alt="avatar" />
                    <div className="chat__user-data">
                        <p>{user.name}</p>
                        <span>{ typing && message.length > 1 ? 'typing...' : 'online'}</span>
                    </div>
                </div>
            </div>
            <div className="chat__window">
                {displayMessages.map((message, i) => (
                    selectedUser.id === message.userId ?
                        <div key={i} className="chat__user-message"><p>{message.message}</p><small>{message.date}</small></div>
                        :
                        <div key={i} className="chat__friend-message"><p>{message.message}</p><small>{message.date}</small></div>
                ))}
            </div>
            <form className="chat__form" onSubmit={handleSave}>
                <input type="text" className="chat__form-inp" value={message} onChange={(e) => inputChange(e)} placeholder='Send a message' />
                <button type='Submit' className='chat__send'>
                    {
                        typing && message.length > 1 ?
                            <img src={sendIcon} alt="Send Icon" />
                            :
                            <img src={cameraIcon} alt="Picture send Icon" />
                    }
                </button>
            </form>
        </div>
    )
}
