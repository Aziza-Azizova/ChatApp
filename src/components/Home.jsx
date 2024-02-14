import { useContext, useState } from "react"
import { Context } from "../context/Context"
import Chat from "./Chat";

export default function Home() {
    const { users, selectedUser, setSelectedUser } = useContext(Context);
    const [openChat, setOpenChat] = useState(false);

    function handleOpenChat(user) {
        setOpenChat(true);
        setSelectedUser(user);
    }

    return (
        <div className="container">
            <div className={`users ${openChat ? 'hidden' : ''}`}>
                {
                    users.map(user => (
                        <div className="user" key={user.id} onClick={() => handleOpenChat(user)}>
                            <div className="user__avatar">
                                <img src={user.avatar} alt="avatar" className="user__avatar-img"/>
                            </div>
                            <div className="user__name">{user.name}</div>
                        </div>
                    ))
                }
            </div>
            <div className={openChat ? '' : 'hidden'}>
                {openChat && <Chat user={selectedUser}/>}
            </div>
        </div>
    )
}
