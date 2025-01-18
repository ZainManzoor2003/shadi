import React, { useContext, useEffect } from 'react'
import './UserDetails.css'
import CreateContextApi from '../../ContextApi/CreateContextApi';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function UserDetails({ }) {
    const { userDetails, setUserDetails } = useContext(CreateContextApi);
    const { id } = useParams();
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`https://shadi-backend.vercel.app/${id}/fetchUserDetails`);
                setUserDetails(response.data); // Update state with fetched users
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        }
        fetchUserDetails()
    }, [])
    return (
        <>
             <div id="sectionerparent">
            <div id="sectioner">
                <div id="upperabc">
                    <div id="imager">
                        <div id="uyy">
                            <img src={userDetails.image} />
                        </div>
                    </div>
                    <div>
                        <div id="abc">
                            <h3>{userDetails.name}</h3>
                            <p>Age:{userDetails.age}</p>
                            <p>{userDetails.city}, {userDetails.province}, {userDetails.country}</p>
                        </div>

                        <div class="table-container">
                        
                        </div>
                    </div>
                </div>
            </div>
            <div id="deatils">
                <div id="head">
                    <h1>Member Overview </h1>
                    <p>my name is {userDetails.name} i am from {userDetails.city}. {userDetails.description}</p>
                </div>
                {/* <div id="head">
                    <h1>Seeking</h1>
                    <p>The boy should be loving, caring, trusting and loving with my parents. One last thing, the house should be your own.
                    </p>
                </div> */}
            </div>
            <div id="more">
                <h1>More about me</h1>

                <h3>Appearance</h3>


                <div id="tabler">
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Overview</th>
                                    <th>{userDetails.name}</th>
                                    <th>She is looking for</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>No Of Childrens:</td>
                                    <td>{userDetails.numberOfChildren}</td>
                                    <td>Any</td>

                                </tr>
                                <tr>
                                    <td>Drink:</td>
                                    <td>{userDetails.drink}</td>
                                    <td>Any</td>

                                </tr>
                                <tr>
                                    <td>Smoke:</td>
                                    <td>{userDetails.smoke}</td>
                                    <td>Any</td>

                                </tr>
                                <tr>
                                    <td>Martial Status:</td>
                                    <td>{userDetails.maritalStatus}</td>
                                    <td>Any</td>

                                </tr>
                                <tr>
                                    <td>Employment Status:</td>
                                    <td>{userDetails.employmentStatus}</td>
                                    <td>Any</td>

                                </tr>
                            </tbody>
                        </table>

                    </div>

                </div>
                <h3>Lifestyle</h3>



                <div id="tabler">
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Overview</th>
                                    <th>{userDetails.name}</th>
                                    <th>She is looking for</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Hair Color:</td>
                                    <td>{userDetails.hairColor}</td>
                                    <td>Any</td>

                                </tr>
                                <tr>
                                    <td>Eye Color:</td>
                                    <td>{userDetails.eyeColor}</td>
                                    <td>Any</td>

                                </tr>
                                <tr>
                                    <td>Appearance:</td>
                                    <td>{userDetails.appearance}</td>
                                    <td>Any</td>

                                </tr>
                                <tr>
                                    <td>Height:</td>
                                    <td>{userDetails.height} cm</td>
                                    <td>Any</td>

                                </tr>
                                <tr>
                                    <td>Weight:</td>
                                    <td>{userDetails.weight} kg</td>
                                    <td>Any</td>

                                </tr>
                            </tbody>
                        </table>

                    </div>

                </div>
            </div>
            </div>
        </>
    )
}
