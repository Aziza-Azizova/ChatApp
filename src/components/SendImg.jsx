import React, { useContext, useState } from 'react';
import { Context } from '../context/Context';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';


function SendImg() {
    const { sendPic, setSendPic, selectedUser, getMessageFromFirestore } = useContext(Context);
    const [imgUrl, setImgUrl] = useState('');
    const ref = collection(db, 'messages');

    async function handleSave(e) {
        e.preventDefault();

        let data = {
            userId: selectedUser.id,
            username: selectedUser.name,
            message: imgUrl,
            date: new Date().toLocaleTimeString()
        }

        try {
            if(data.message !== ''){
                addDoc(ref, data)
            }
        } catch (e) {
            console.log(e);
        }

        setImgUrl('');
        getMessageFromFirestore();
        setSendPic(false);
    }

    function inputChange(e) {
        setImgUrl(e.target.value);
    }

    return (
        <form className={`modal ${sendPic ? '' : 'hidden'}`} onSubmit={handleSave}>
            <div className='modal__window'>
                <h2 className="modal__window-title">Send Image</h2>
                <input type="text" placeholder="URL" value={imgUrl} onChange={(e) => inputChange(e)}/>   
                <div className="modal__buttons">
                    <button className="modal__buttons-cancel" onClick={() => setSendPic(false)}>Cancel</button>
                    <button type='submit' className="modal__buttons-send">Send</button>
                </div>
            </div>
        </form>
    )
}

export default SendImg