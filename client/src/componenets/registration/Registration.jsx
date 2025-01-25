import React, { useContext, useEffect, useState } from 'react'
import './Registration.css'
import { useNavigate } from 'react-router-dom'
// import countries from '../../assets/countries';
import axios from 'axios';
import CreateContextApi from '../../ContextApi/CreateContextApi';

export default function Registration() {
    const relationPreferences = [
        "Friendship",
        "Networking",
        "Casual Dating",
        "Long-term Relationship",
        "Marriage",
        "Professional Collaboration",
        "Mentorship",
        "Travel Companionship",
        "Study Partnership",
        "Roommate Search"
    ];
    const navigate = useNavigate();
    const [country, setCountry] = useState('');
    const [code, setCode] = useState('');
    const { countries, setCountries, cities, setCities, provinces, setProvinces } = useContext(CreateContextApi)
    const [city, setCity] = useState('')
    const [province, setProvince] = useState('')
    const range = Array.from({ length: 99 - 18 + 1 }, (_, i) => i + 18);
    const [uploadedUrl, setUploadedUrl] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [provinceSuggestions, setProvinceSuggestions] = useState([]);
    const [next, setNext] = useState({ one: false, two: false, three: false });
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: '',
        dob: '',
        gender: '',
        country: '',
        province: '',
        city: '',
        description: '',
        relationshipPreference: '',
        religion: '',
        keywords: '',
        image: uploadedUrl,
        password: '',
        hairColor: '',
        eyeColor: '',
        height: '',
        weight: '',
        appearance: '',
        bodyStyle: '',
        drink: '',
        smoke: '',
        martialStatus: '',
        employmentStatus: '',
        numberOfChildren: '',
        annualIncome: '' // Assuming password is part of the form
    });
    // useEffect(() => {
    //     country == '' && setSuggestions([])
    // }, [country])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Function to handle country input changes
    const handleCountryChange = (e) => {
        const input = e.target.value;
        const { name } = e.target;
        setUser((prev) => ({
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
        setUser((prev) => ({
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
        setUser((prev) => ({
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
        setUser((prev) => ({
            ...prev,
            country: country.name
        })); // Set the clicked suggestion as the input value
        setSuggestions([]);
        setCode(country.iso2) // Clear suggestions
    };
    const handleProvinceSuggestion = (province) => {
        setUser((prev) => ({
            ...prev,
            province: province.name
        })); // Set the clicked suggestion as the input value
        setProvinceSuggestions([]); // Clear suggestions
    };
    const handleCitySuggestion = (city) => {
        setUser((prev) => ({
            ...prev,
            city: city.name
        })); // Set the clicked suggestion as the input value
        setCitySuggestions([]);
    };

    const handleFirstNext = () => {
        setNext((prevState) => ({
            ...prevState, // Preserve previous state
            one: true,    // Update 'one' to true
        }));
    }
    const handleSecondNext = () => {
        setNext((prevState) => ({
            ...prevState, // Preserve previous state
            two: true,    // Update 'one' to true
        }));
    }
    const handleSubmit = async () => {
        setLoading(true)
        try {
            // Send a POST request to your Node.js backend
            const response = await axios.post('http://localhost:3001/register', user);

            if (response.data.mes == 'Registered Successfully') {
                alert(response.data.mes)
                // Handle successful login (e.g., redirect, store token)
                navigate('/login')
            } else {
                // Handle unsuccessful login
                alert('Error white registering');
            }
        } catch (error) {
            // Handle error (e.g., network issues)
            console.log('An error occurred. Please try again.');
        }
        setLoading(false)
    }
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        console.log(file);

        if (!file) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        console.log(formData);

        try {
            const response = await axios.post("http://localhost:3001/upload", formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    responseType: 'json',
                });

            setUploadedUrl(response.data.url);
            setUser((prev) => ({
                ...prev,
                image: response.data.url,
            })) // Store the uploaded file's URL
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload the image.");
        }
    };


    return (
        <>
            <div class="modal-overlay">
                {!next.one ?
                    <>

                        <div class="modal-content">
                            <h1 id="ppq">Register Form</h1>
                            <div class="form-row">
                                <div class="form-col">
                                    <label id="la">Name:</label>
                                    <input type="text"
                                        name="name"
                                        value={user.name}
                                        onChange={handleInputChange} />
                                </div>
                                <div class="form-col">
                                    <label id="la">DOB:</label>
                                    <input type="date" name="dob" id="" value={user.dob} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-col">
                                    <label id="la">Gender:</label>
                                    <select id="gender" name="gender"
                                        value={user.gender}
                                        onChange={handleInputChange}>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div class="form-col">
                                    <label id="la">Country:</label>
                                    <input type="text" name="country"
                                        value={user.country}
                                        onChange={handleCountryChange}
                                    />
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
                            </div>
                            <div class="form-row">
                                <div class="form-col">
                                    <label id="la">Provinvce:</label>
                                    <input type="text" name="province"
                                        value={user.province}
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
                                <div class="form-col">
                                    <label id="la">City:</label>
                                    <input type="text" name="city"
                                        value={user.city}
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
                            <div class="form-row">
                                <div class="form-col">
                                    <label id="la">Bio Description (optional):</label>
                                    <input type="text" name="description"
                                        value={user.description}
                                        onChange={handleInputChange} />
                                </div>
                                <div class="form-col">
                                    <label id="la">Relationship Preferences:</label>
                                    <select name='relationshipPreference' id=""
                                        value={user.relationshipPreference} onChange={handleInputChange}>
                                        <option value="">Select Preference</option>
                                        {relationPreferences.map(option => (
                                            <option value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-col">
                                    <label id="la">Religion</label>
                                    <input type="text" name="religion"
                                        value={user.religion}
                                        onChange={handleInputChange} />
                                </div>
                                <div class="form-col">
                                    <label id="la">Keywords</label>
                                    <input type="text" name="keywords"
                                        value={user.keywords}
                                        onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <label id="la">Email</label>
                                    <input type="text" name="email" value={user.email}
                                        onChange={handleInputChange} />
                                </div>
                                <div className="form-col">
                                    <label id="la">Password</label>
                                    <input type="text" name="password" value={user.password}
                                        onChange={handleInputChange} />
                                </div>

                            </div>
                            <label id="la" >Image:</label>
                            <input type="file" id="file" name='image' style={{ display: 'none' }}
                                onChange={handleFileChange} />
                            <button class="button" onClick={() => document.getElementById('file').click()}>Select Image</button>
                            <button class="submit-btn" onClick={handleFirstNext}>Next</button>

                            <a class="login-navigate" onClick={() => navigate('/login')}>Already have an account <span>Login</span></a>
                        </div>
                    </> : !next.two ? <>

                        <div class="modal-content">
                            <h1 id="ppq">Appearance</h1>
                            <div class="form-row">
                                <div class="form-col">
                                    <label id="la">Hair color:</label>
                                    <input type="text" name="hairColor"
                                        value={user.hairColor}
                                        onChange={handleInputChange} />
                                </div>
                                <div class="form-col">
                                    <label id="la">Eye color:</label>
                                    <input type="text" name="eyeColor"
                                        value={user.eyeColor}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-col">
                                    <label id="la">Height (cm):</label>
                                    <input type="text" name="height"
                                        value={user.height}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div class="form-col">
                                    <label id="la">Weight (kg):</label>
                                    <input type="text" name="weight"
                                        value={user.weight}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-col">
                                    <label id="la">Appearance:</label>
                                    <input type="text" name="appearance"
                                        value={user.appearance}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div class="form-col">
                                    <label id="la">Body style:</label>
                                    <input type="text" name="bodyStyle"
                                        value={user.bodyStyle}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <button class="submit-btn" onClick={handleSecondNext}>Next</button>

                            <a class="login-navigate" onClick={() => navigate('/login')}>Already have an account <span>Login</span></a>
                        </div></> :
                        <>

                            <div class="modal-content">
                                <h1 id="ppq">Lifestyle</h1>
                                <div class="form-row">
                                    <div class="form-col">
                                        <label id="la">Drink:</label>
                                        <input type="text" name="drink"
                                            value={user.drink}
                                            onChange={handleInputChange} />
                                    </div>
                                    <div class="form-col">
                                        <label id="la">Smoke:</label>
                                        <input type="text" name="smoke"
                                            value={user.smoke}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-col">
                                        <label id="la">Marital Status:</label>
                                        <input type="text" name="martialStatus"
                                            value={user.martialStatus}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div class="form-col">
                                        <label id="la">Employment Status:</label>
                                        <input type="text" name="employmentStatus"
                                            value={user.employmentStatus}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-col">
                                        <label id="la">Number of children:</label>
                                        <input type="text" name="numberOfChildren"
                                            value={user.numberOfChildren}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div class="form-col">
                                        <label id="la">Annual income:</label>
                                        <input type="text" name="annualIncome"
                                            value={user.annualIncome}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <button disabled={loading} class="submit-btn"
                                    onClick={handleSubmit}>{loading ? 'Registring... ' : 'Submit'}</button>

                                <a class="login-navigate" onClick={() => navigate('/login')}>Already have an account <span>Login</span></a>
                            </div>
                        </>}
            </div>
        </>
    )
}
