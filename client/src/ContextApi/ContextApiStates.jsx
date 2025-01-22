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
  const [countries,setCountries]=useState([])
  const [provinces,setProvinces]=useState([])
  const [cities,setCities]=useState([])
  const socket = useRef();
  useEffect(() => {
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "ZWlRUzczU0F0MnU1eG5lb3JmcVBqUGtncHRWQjR0cXhKcjhXNXhaZQ==");

    var requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    };

    fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
      .then(response => response.text())
      .then(result => setCountries(JSON.parse(result)))
      .catch(error => console.log('error', error));
  }, [])


  return (
    <>
      <CreateContextApi.Provider value={{
        allUsers, setAllUsers, userDetails, setUserDetails, socket, activeUsers, setActiveUsers,
        temprecieverId, setTempReceverId, allMessages, setAllMessages, tempMessages, setTempMessages, contacts,
        setContacts, tempContacts, settempContacts,countries,setCountries,cities,setCities,provinces,setProvinces
      }}>
        {props.children}
      </CreateContextApi.Provider>
    </>
  )
}
