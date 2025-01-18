import React, { useContext, useEffect, useState } from 'react'
import { BsTelephoneFill, BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaPhoneAlt } from "react-icons/fa";
import { BsEmojiSmile } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdKeyboardVoice } from 'react-icons/md'
import { BiSolidSend } from 'react-icons/bi'
// import EmojiPicker from 'emoji-picker-react';
import { RxCross1 } from "react-icons/rx";
import { IoIosContacts } from "react-icons/io";
import { IoPersonAddSharp } from "react-icons/io5";

import CreateContextApi from '../../ContextApi/CreateContextApi'
import './Message.css'
import axios from 'axios'
import { useParams } from 'react-router'

export default function Message({ changeChat, userForChat, status, allChatClick, changeAllChatClick }) {
    const { socket, temprecieverId, setTempReceverId, allMessages, setAllMessages, tempMessages, setTempMessages,
        setContacts, settempContacts,contacts } = useContext(CreateContextApi)
    const { id } = useParams();
    const [message, setMessage] = useState({
        message: '',
        type: 'text'
    });
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/fetchMessages`);
                setAllMessages(response.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        allMessages.length === 0 && fetchMessages();
    }, []);

    useEffect(() => {

        const modifyMessages = () => {
            let temp = allMessages.filter(obj => (obj.reciever === userForChat.id && obj.sender === id) ||
                (obj.reciever === id && obj.sender === userForChat.id))
            setTempMessages(temp)
        }
        modifyMessages()
    }, [userForChat.id, allMessages])

    useEffect(() => {
        socket.current.on('getMessage', (data) => {
            setAllMessages((pre) => ([...pre, data]))
            setTempReceverId(data.sender);
        })
    }, [])
    const keyPressed = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }
    const sendMessage = async () => {
        if (message.message !== '') {

            const messageObj = {
                sender: id, reciever: userForChat.id, message: message.message, type: message.type,
                name: userForChat.name, image: userForChat.image

            };
            // console.log('send Message', messageObj);
            setAllMessages([...allMessages, messageObj])
            socket.current.emit('sendMessage', messageObj);
            setMessage({ message: '', type: 'text' });
            await axios.post(`http://localhost:3001/sendMessage`, messageObj)
                .then((res) => {
                    if (res.data.mes === 'Success') {
                    }
                })
        }
    }
    return (
        <>
            <section className="messages" style={{ width: allChatClick && '70%' }}>
                {/* <div className='emoji-picker' style={emojiClick===true?{display:'block'}:{display:'none'}}>
              <EmojiPicker onEmojiClick={(e)=>emojiPick(e)} />
            </div> */}
                <div className="top-section">
                    <div className="img">
                        <img src={userForChat.image} alt="" width={'40px'} height={'40px'} style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="top-heading">
                        <h1 style={{ textTransform: 'capitalize' }}>{userForChat.name}</h1>
                        {/* <span>click here for contact info</span> */}
                        <span>{status}</span>
                    </div>
                    <div className="icons" >
                        {/* {!allChatClick && <span onClick={addToContact} style={{ cursor: 'pointer', color: 'white', fontSize: '20px', fontWeight: 'bolder' }}>
                            <IoPersonAddSharp /></span>} */}
                        {!allChatClick && <span onClick={changeAllChatClick} style={{ cursor: 'pointer', color: 'white', fontSize: '20px', fontWeight: 'bolder' }}>
                            <IoIosContacts /></span>}
                        <span onClick={changeChat} style={{ cursor: 'pointer', color: 'white', fontSize: '15px', fontWeight: 'bolder' }}>
                            <RxCross1 /></span>
                    </div>
                </div>
                <div class="all-messages" style={{ height: allChatClick && '70%' }}>
                    {tempMessages && tempMessages.map((data, index) => (
                        <div className={data.sender == id ? "message-jus" : 'message'}>
                            <p className={data.sender == id ? 'send-message' : 'recieve-message'}>{data.message}</p>
                        </div>
                    ))}
                </div>
                <div className="bottom-section">
                    <div className="message-input">
                        <input type="text" placeholder='Type a message' value={message.message} onKeyUp={(e) => keyPressed(e)} onChange={(e) => setMessage({ message: e.target.value, type: 'text' })} />
                    </div>
                    <div className="send-icon">
                        <span onClick={() => sendMessage()}><BiSolidSend /></span>
                    </div>
                </div>
            </section>
        </>
    )
}
