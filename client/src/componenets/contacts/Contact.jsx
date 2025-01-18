import React, { useContext, useEffect, useRef, useState } from 'react'
import { BsFillPeopleFill } from 'react-icons/bs'
import { BsFillChatLeftTextFill } from 'react-icons/bs'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai'
import { GiNetworkBars } from 'react-icons/gi'
import './Contact.css'
import { useNavigate, useParams } from 'react-router';
import CreateContextApi from '../../ContextApi/CreateContextApi'
import axios from 'axios'

export default function Contact({ userForChat, newChatClick }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const { temprecieverId, allMessages, contacts,
        setContacts, tempContacts, settempContacts } = useContext(CreateContextApi)
    useEffect(() => {
        getContacts();
    }, [])
    useEffect(() => {
        changeNonSeenedMessages()

    }, [allMessages])
    const newNotification = async () => {
        try {
            await axios.post(`https://shadi-backend.vercel.app/newNotification/${id}/${temprecieverId} `);
        } catch (error) {

        }
    }
    const changeNotification = async (reciever) => {
        try {
            await axios.post(`https://shadi-backend.vercel.app/changeNotification/${id}/${reciever} `);
        } catch (error) {

        }
    }



    const getContacts = async () => {
        let data = await fetch(`https://shadi-backend.vercel.app/fetchContacts/${id}`);
        let res = await data.json();
        setContacts(res);
        settempContacts(res);
    }
    const searchContacts = (e) => {
        if (e.target.value === '') {
            settempContacts(contacts);
        }
        else {
            settempContacts(contacts.filter((temp) => {
                return temp.name.toLowerCase().includes(e.target.value.toLowerCase());
            }))
        }
    }

    const changeNonSeenedMessages = () => {
        if (temprecieverId && userForChat.id !== temprecieverId) {
            const newState = contacts.map(con => {
                if (con.reciever === temprecieverId) {
                    newNotification()
                    return {
                        ...con, newNotification: 'true'
                    };
                }
                return con;
            })
            setContacts(newState)
            settempContacts(newState)
            // a.setContacts(newState);
            // a.settempContacts(newState);
            // setTempReceverId();
        }
    }
    const changeNewNotification = (contact) => {
        const newState = contacts.map(con => {
            if (con.reciever === contact.reciever) {
                changeNotification(contact.reciever)
                return {
                    ...con, newNotification: 'false'
                };
            }
            return con;
        })
        setContacts(newState)
        settempContacts(newState)
        // a.setContacts(newState);
        // a.settempContacts(newState);
        // setTempReceverId();
    }

    return (
        <>
            <div class="contacts">
                <section class="top-section">
                    <img src={userForChat.image} alt="" width={'40px'} height={'40px'} />
                    <div class="icons">
                        <div class="icon">
                            <BsFillChatLeftTextFill />
                        </div>
                    </div>
                </section>
                <section class="middle-section">
                    <div class="input">
                        <span><AiOutlineSearch /></span>
                        <input type="text" placeholder='Search or start a new chat' onChange={(e) => searchContacts(e)} />
                    </div>
                    <span><GiNetworkBars /></span>
                </section>
                <section className='all-contacts'>
                    {tempContacts ? tempContacts.map((contacts, index) => (
                        <div class="contact" onClick={() => { newChatClick(contacts); changeNewNotification(contacts) }}>
                            <div class="left-section">
                                <img src={contacts.image} alt="img" width={'50px'} height={'50px'} />
                            </div>
                            <div class="middle-section">
                                <h3 style={{ textTransform: 'capitalize' }}>{contacts.name}</h3>
                            </div>
                            <div class="right-section-time">
                                {/* <span>11:89</span> */}
                                {contacts.newNotification === 'true' && <span className='nonSeenedMessages'>New</span>}
                            </div>
                        </div>
                    )) : <h1>No Contacts Found</h1>}
                </section>
            </div>
        </>
    )
}
