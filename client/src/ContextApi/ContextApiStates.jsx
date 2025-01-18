import CreateContextApi from './CreateContextApi'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';

export default function ContextApiStates(props) {

  const [allUsers, setAllUsers] = useState([])
  const [userDetails, setUserDetails] = useState([])
  const [activeUsers, setActiveUsers] = useState([]);
  const [temprecieverId, setTempReceverId] = useState(undefined);
  const [allMessages, setAllMessages] = useState([])
  const [tempMessages, setTempMessages] = useState([])
  const [contacts, setContacts] = useState([]);
  const [tempContacts, settempContacts] = useState([]);
  const socket = useRef();

  return (
    <>
      <CreateContextApi.Provider value={{
        allUsers, setAllUsers, userDetails, setUserDetails, socket, activeUsers, setActiveUsers,
        temprecieverId, setTempReceverId, allMessages, setAllMessages, tempMessages, setTempMessages, contacts,
        setContacts, tempContacts, settempContacts
      }}>
        {props.children}
      </CreateContextApi.Provider>
    </>
  )
}
