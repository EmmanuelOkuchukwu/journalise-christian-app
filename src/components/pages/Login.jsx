import React, { useState } from 'react';
import '../scss/login.scss';
import { AuthService } from '../../services/AuthenticationService';
import { Redirect } from 'react-router-dom';

const Login = ({ history, userInfo }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (evt) => {
        setIsLoading(true);
        evt.preventDefault();
        AuthService.onLogin(email, password)
            .then((result) => {
                console.log(result);
                setMessage(result.message);
                setIsLoading(false);
            })
            .catch((err) => {
                setMessage(err.message);
                console.log(err);
                setIsLoading(false);
            })
    }
    if(AuthService.currentUserValue) {
        return <Redirect to={{ pathname: '/feed' }} />;
    }
    return (
        <div className="login-container">
            <div className="login-background">
                <form className="login-form" onSubmit={handleLogin}>
                    <h3 className="login-title">Login</h3>
                    {message && <div className="error-message">{message}</div>}
                    <div className="input-form">
                        <label>Email</label><input className="text-field" type="text" name="email" value={email} onChange={(evt) => setEmail(evt.target.value)} placeholder="john.doe@gmail.com" />
                    </div>
                    <div className="input-form">
                        <label>Password</label><input className="text-field" type="password" name="password" value={password} onChange={(evt) => setPassword(evt.target.value)} placeholder="XXXXXXXXXXXX" />
                    </div>
                    <input type="submit" className="btn-login" disabled={isLoading} value={!isLoading ? 'Login' : 'Loading...'} />
                    <a href="" className="forg-link">Forgot Password?</a><br /><br />
                    <div className="register-link">
                        <p>Need an Account?</p>
                        <button className="btn-register" onClick={() => history.push('/register')}>Register Now!</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
