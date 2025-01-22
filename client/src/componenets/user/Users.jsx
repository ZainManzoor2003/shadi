import React, { useContext, useEffect, useState } from 'react'
import './Users.css'
import CreateContextApi from '../../ContextApi/CreateContextApi';
import { useNavigate, useParams } from 'react-router-dom';
// import countries from '../../assets/countries';
import Message from '../messages/Message';
import { io } from 'socket.io-client'
import axios from 'axios';
import { IoMdChatboxes } from "react-icons/io";
import Contact from '../contacts/Contact';

export default function Users() {
    const navigate = useNavigate();
    const [chat, setChat] = useState(false);
    const [code, setCode] = useState('');
    const [allChatClick, setAllChatClick] = useState();
    const range = Array.from({ length: 99 - 18 + 1 }, (_, i) => i + 18);
    const [status, setStatus] = useState()
    const [city, setCity] = useState('')
    const [province, setProvince] = useState('')
    const { id } = useParams()
    const { allUsers, setAllUsers, setUserDetails, socket, activeUsers, setActiveUsers,
        countries, setCountries, cities, setCities, provinces, setProvinces
    } = useContext(CreateContextApi);
    const [tempAllUsers, setTempAllUsers] = useState(allUsers)

    const [userForChat, setUserForChat] = useState({ image: '', name: '', id: '' })
    const [country, setCountry] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [provinceSuggestions, setProvinceSuggestions] = useState([]);
    const [filterUser, setFilterUser] = useState({
        lookingFor: '',
        startAge: '',
        endAge: '',
        country: '',
        province: '',
        city: ''
    })
    useEffect(() => {
        setTempAllUsers(allUsers)
    }, [allUsers])
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`https://shadi-backend.vercel.app/${id}/fetchUsers`);
                setAllUsers(response.data); // Update state with fetched users
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        allUsers.length === 0 && fetchUsers();
    }, []);
    useEffect(() => {
        socket.current = io('ws://localhost:9000');
    }, [])
    useEffect(() => {
        socket.current.emit('addUser', {
            status: 'Online',
            id: id
        })
    }, [])
    useEffect(() => {
        socket.current.on('getUsers', users => {
            setActiveUsers(users);
        })
    }, [])
    useEffect(() => {
        const user = activeUsers?.find(user => user.id === userForChat.id);
        if (user) {
            setStatus(user.status)
        }
        else {
            setStatus('Offline');
        }
    }, [chat, userForChat.id, activeUsers])
    useEffect(() => {
        country == '' && setSuggestions([])
    }, [country])
    const handleCountryChange = (e) => {
        const input = e.target.value;
        const { name } = e.target;
        setFilterUser((prev) => ({
            ...prev,
            [name]: input
        }));

        // Filter countries based on input
        const filteredCountries = countries.filter((country) =>
            country.name.toLowerCase().startsWith(input.toLowerCase())
        );

        setSuggestions(filteredCountries); // Update suggestions state
        console.log('Suggestions:', filteredCountries); // Log suggestions to the console
    };

    const handleProvinceChange = (e) => {
        const input = e.target.value;
        const { name } = e.target;
        setFilterUser((prev) => ({
            ...prev,
            [name]: input
        }));

        // Filter countries based on input
        const filteredCountries = provinces.filter((province) =>
            province.name.toLowerCase().startsWith(input.toLowerCase())
        );

        setProvinceSuggestions(filteredCountries); // Update suggestions state
        console.log('Suggestions:', filteredCountries); // Log suggestions to the console
    };
    const handleCityChange = (e) => {
        const input = e.target.value;
        const { name } = e.target;
        setFilterUser((prev) => ({
            ...prev,
            [name]: input
        }));

        // Filter countries based on input
        const filteredCountries = cities.filter((city) =>
            city.name.toLowerCase().startsWith(input.toLowerCase())
        );

        setCitySuggestions(filteredCountries); // Update suggestions state
        console.log('Suggestions:', filteredCountries); // Log suggestions to the console
    };

    const getProvinces = () => {
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", "ZWlRUzczU0F0MnU1eG5lb3JmcVBqUGtncHRWQjR0cXhKcjhXNXhaZQ==");

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        fetch(`https://api.countrystatecity.in/v1/countries/${code}/states`, requestOptions)
            .then(response => response.text())
            .then(result => setProvinces(JSON.parse(result)))
            .catch(error => console.log('error', error));
    }
    const getCities = () => {
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", "ZWlRUzczU0F0MnU1eG5lb3JmcVBqUGtncHRWQjR0cXhKcjhXNXhaZQ==");

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        fetch(`https://api.countrystatecity.in/v1/countries/${code}/cities`, requestOptions)
            .then(response => response.text())
            .then(result => setCities(JSON.parse(result)))
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        code && getCities()
    }, [code])
    useEffect(() => {
        code && getProvinces()
    }, [code])

    const handleSuggestionClick = (country) => {
        setFilterUser((prev) => ({
            ...prev,
            country: country.name
        })); // Set the clicked suggestion as the input value
        setSuggestions([]);
        setCode(country.iso2) // Clear suggestions
    };
    const handleProvinceSuggestion = (province) => {
        setFilterUser((prev) => ({
            ...prev,
            province: province.name
        })); // Set the clicked suggestion as the input value
        setProvinceSuggestions([]); // Clear suggestions
    };
    const handleCitySuggestion = (city) => {
        setFilterUser((prev) => ({
            ...prev,
            city: city.name
        })); // Set the clicked suggestion as the input value
        setCitySuggestions([]);
    };

    const filterUsers = (e) => {
        e.preventDefault()
        const filteredData = allUsers.filter((user) => {
            const isLookingForMatch =
                filterUser.lookingFor === '' || user.gender === filterUser.lookingFor;
            const isAgeMatch =
                (filterUser.startAge === '' || user.age >= parseInt(filterUser.startAge)) &&
                (filterUser.endAge === '' || user.age <= parseInt(filterUser.endAge));
            const isCountryMatch =
                filterUser.country === '' || user.country.toLowerCase() === filterUser.country.toLowerCase();
            const isProvinceMatch =
                filterUser.province === '' || user.province.toLowerCase() === filterUser.province.toLowerCase();
            const isCityMatch =
                filterUser.city === '' || user.city.toLowerCase() === filterUser.city.toLowerCase();

            return isLookingForMatch && isAgeMatch && isCountryMatch && isProvinceMatch && isCityMatch;
        })
        setTempAllUsers(filteredData)
    }
    const resetUsers = (e) => {
        e.preventDefault()
        setTempAllUsers(allUsers)
        setFilterUser({
            lookingFor: '',
            startAge: '',
            endAge: '',
            country: '',
            province: '',
            city: ''
        })
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilterUser((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    return (
        <>
            <div className="users-container">

                <div id="header">
                    <h1>HeartSync</h1>
                    <h2>Recently Joined Members</h2>
                </div>
                <form className='filter-form'>

                    <h1>Find Your True Love</h1>
                    <div className="form-row">
                        <div className="form-col">

                            <label>Looking For</label>
                            <input type="text" name='lookingFor' value={filterUser.lookingFor} onChange={handleInputChange} />
                        </div>
                        <div className="form-col">
                            <label>Age</label>
                            <div className="form-row">

                                <select id="age" name="startAge" value={filterUser.startAge} onChange={handleInputChange}>
                                    <option value="">Start Age</option>
                                    {range.map(num => (
                                        <option value={num}>{num}</option>
                                    ))}
                                </select>
                                <select id="age" name="endAge" value={filterUser.endAge} onChange={handleInputChange}>
                                    <option value="">End Age</option>
                                    {range.map(num => (
                                        <option value={num}>{num}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-col">
                            <label>Country </label>
                            <input type="text" name='country' value={filterUser.country} onChange={handleCountryChange} />
                            {suggestions.length > 0 && (
                                <ul className="suggestions-list">
                                    {suggestions.map((country, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleSuggestionClick(country)}
                                            className="suggestion-item"
                                        >
                                            {country.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="form-col">
                            <label>Province</label>
                            <input type="text" name="province"
                                value={filterUser.province}
                                onChange={handleProvinceChange}
                            />
                            {provinceSuggestions.length > 0 && (
                                <ul className="suggestions-list">
                                    {provinceSuggestions.map((province, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleProvinceSuggestion(province)}
                                            className="suggestion-item"
                                        >
                                            {province.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="form-col">
                            <label>City</label>
                            <input type="text" name="city"
                                        value={filterUser.city}
                                        onChange={handleCityChange}
                                    />
                                    {citySuggestions.length > 0 && (
                                        <ul className="suggestions-list">
                                            {citySuggestions.map((city, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleCitySuggestion(city)}
                                                    className="suggestion-item"
                                                >
                                                    {city.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                        </div>
                    </div>
                    <div className="form-row">

                        <div className="form-button">
                            <button type="submit" onClick={filterUsers}>Find Your Partner</button>
                        </div>
                        <div className="form-button">
                            <button type="submit" onClick={resetUsers}>Reset</button>
                        </div>
                    </div>
                </form>
                <div id='uppercontainer'>
                    {tempAllUsers &&
                        tempAllUsers.map((user) => (
                            <div key={user.image} className='card'>
                                <img
                                    className='cardImage'
                                    src={user.image}
                                    onClick={() => {
                                        setUserDetails(user);
                                        navigate(`/${user._id}/userDetails`);
                                    }}
                                />
                                <div className='cardSection'>
                                    <div className='cardContent'>
                                        <div className='cardText'>
                                            <h2 className='cardName'>{user.name}</h2>
                                            <h2 className='cardName'></h2>
                                            <h2 className='cardName'>{user.age}</h2>
                                        </div>
                                        <span
                                            style={{ cursor: "pointer", color: "white" }}
                                            onClick={() => {
                                                setUserForChat({
                                                    name: user.name,
                                                    image: user.image,
                                                    id: user._id,
                                                });
                                                setChat(true);
                                            }}>
                                            <IoMdChatboxes />
                                        </span>
                                    </div>
                                    <p className='cardDescription'>{user.description}</p>
                                </div>
                            </div>
                        ))}
                </div>
                {chat && <div className="chat-container">
                    <Message changeChat={
                        () => { setChat(false); setAllChatClick(false) }} userForChat={userForChat} status={status} allChatClick={allChatClick}
                        changeAllChatClick={() => { setAllChatClick(true); setChat(false) }}
                    />
                </div>}
                {allChatClick && <div className="chat-container" style=
                    {{ width: '100vw', height: '100vh', display: 'flex' }}
                >
                    <Contact userForChat={userForChat} newChatClick={
                        (contacts) => setUserForChat({ name: contacts.name, image: contacts.image, id: contacts.reciever })} />
                    <Message changeChat={
                        () => { setAllChatClick(false) }} userForChat={userForChat} status={status} allChatClick={allChatClick}
                        changeAllChatClick={() => setAllChatClick(true)}
                    />
                </div>}
            </div>
            <footer className='footer'>
                <div className='footerContainer'>
                    <p className='footerText'>MEET THE LOVE OF YOUR LIFE</p>
                </div>
                <div className='footerContainer'>
                    <hr />
                    <p>HeartSync All right reserved @ 2025</p>
                </div>
            </footer>
        </>
    )
}
