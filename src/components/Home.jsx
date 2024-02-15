import { useContext, useState } from "react"
import { Context } from "../context/Context"
import Chat from "./Chat";

export default function Home() {
    const { users, selectedUser, setSelectedUser } = useContext(Context);
    const [openChat, setOpenChat] = useState(false);
    const [friend, setFriend] = useState({})

    function handleOpenChat(user) {
        setOpenChat(true);
        setSelectedUser(user);
        users.forEach(element => {
            if (element !== user) {
                setFriend(element)
            }
        });
    }

    return (
        <div className="container">
            <div className={`${openChat ? 'hidden' : ''}`}>
                <h2 className='title'>Choose your character</h2>
                <div className="users">
                    {
                        users.map(user => (
                            <div className="user" key={user.id} onClick={() => handleOpenChat(user)}>
                                <div className="user__avatar">
                                    <img src={user.avatar} alt="avatar" className="user__avatar-img" />
                                </div>
                                <div className="user__name">{user.name}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={openChat ? '' : 'hidden'}>
                {openChat && <Chat user={selectedUser} friend={friend} />}
            </div>
        </div>
    )
}
