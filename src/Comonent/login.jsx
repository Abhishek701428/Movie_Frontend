import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            if (isRegistering) {
                const response = await axios.post('http://localhost:8000/user/register', { email, username, password });
                const { token } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
            } else {
                const response = await axios.post('http://localhost:8000/user/login', { username, password });
                const { token } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
            }
            onLogin();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <div>
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleAuth}>
                {isRegistering && (
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                )}
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            </form>
            <p onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Already have an account? Login here.' : 'Don\'t have an account? Register here.'}
            </p>
        </div>
    );
};

export default Login;
