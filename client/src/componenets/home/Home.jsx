import React from 'react'
import { useNavigate } from "react-router";
import './Home.css'

const Home = () => {

    const navigate = useNavigate();

    function clickhandler() {
        navigate("/signup")
    }

    return (
        <>
            <div id="myparent">
                <div id="logger">
                    <div class="logo-blur"></div>
                    <img src="./removed.png" />
                </div>

                <div id="headingg-area">
                    <h1>The best site<br></br>
                        to find your partner</h1>
                    <div id="iopuy">
                        <button onClick={() => navigate('/registration')}>Sign in</button>
                    </div>

                </div>
            </div>

            <div id="uuut">
                <p>Our Approach</p>
                <h3>Go on your last first
                    date.</h3>
            </div>
            <div id="utttu">
                <p>Discover a place where real connections are made. At our site we believe every love story deserves its perfect beginning. Whether you're looking for a soulmate, a partner for life's adventures, or simply someone who understands you, this is where you'll find them.</p>
            </div>


            <div id="rrtq">
                <img src="yytr.webp" />
                <div id="divver">
                    <h3>We're love scientists.</h3>
                    <p>We’re not just another dating site. We’re love scientists, combining the art of connection with the science of compatibility. Our mission? To find the perfect formula for your happily ever after.</p>
                </div>
            </div>

            <div id="footerarea">
                <h3>Helping hearts connect and stories begin</h3>
                <p>Let’s start your journey with us.</p>
                <button>Join now</button>
                <div id="hher">
                    <hr></hr>
                </div>

            </div>
        </>
    )
}

export default Home