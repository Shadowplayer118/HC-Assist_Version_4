import { useState, useEffect } from "react";
import axios from "axios";
import '../css/login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const [showWelcome, setShowWelcome] = useState(false); // Welcome screen state
    const [position, setPosition] = useState(''); // Position state

    const isLoggedIn = () => {
        const token = localStorage.getItem('token');
        if (token) {

            // if(position == 'Patient'){
            //     alert(' Patient Logged in');
            // }

            // else if(position == 'Staff'){
            //     alert(' Staff Logged in');
            // }

            // else if(position == 'Midwife'){
            //     alert(' Midwife Logged in');
            // }

            // else if(position == 'Admin'){
            //     alert('Admin Logged in');
            // }
            window.location.href = '/dashboard';
            return;
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true); // Set loading to true
        try {
            const res = await axios.post(
                'http://localhost/HC-Assist_Version_4/php/old_php/loginAPI.php',
                {
                    username: username,
                    password: password,
                }
            );
            console.log(res.data);
            if (res.data.status) {
                // Save user data and position into state/local storage
                setPosition(res.data.user.position); // Save the position
                localStorage.setItem('token', JSON.stringify(res.data.user));
                
                // Show the welcome screen for 3 seconds after loading
                setLoading(false);
                setShowWelcome(true);
                setTimeout(() => {
                    window.location.href = '/dashboard'; // Redirect to the dashboard
                }, 3000); // 3 seconds delay
            } else {
                alert('Invalid username or password');
                console.error("Login failed: Incorrect credentials");
            }
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setLoading(false); // Set loading to false after the login process
        }
    }

    if (showWelcome) {
        // Welcome screen content
        return (
            <div className="welcome-screen">
                <h1>Welcome to HC-Assist</h1>
                <h2>{username}</h2>
                <h3>Your position: {position}</h3> {/* Display the position */}
                <div className="triangle-spinner"></div>
            </div>
        );
    }

    return (
        <div className="whole">
            <div className="login-container">
                <div className="titles">
                    <div className="HC-Assist">HC-Assist</div>
                    <div className="subtitle">A Health Center Management System</div>
                </div>

                <div className="loginForm">
                    <div className="formContent">
                        <form onSubmit={handleLogin} method="post">
                            <label htmlFor="username">Username:</label> <br />
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="username"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <br />
                            <label htmlFor="password">Password:</label> <br />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <br />
                            <button type="submit" className="login-btn">
                                Login
                            </button>
                        </form>
                    </div>
                </div>

                <div className="design">
                    <div className="left-slantbox">2</div>
                    <div className="right-slantbox">2</div>

                    <div className="image-container">
                        <img
                            src="assets/Login_doc.png"
                            alt="Login illustration"
                            style={{ height: '100vh' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
