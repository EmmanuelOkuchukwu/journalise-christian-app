import React, { useState } from 'react';
import '../scss/register.scss';
import { AuthService } from '../../services/AuthenticationService';

const Register = ({ history }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [denomination, setDenomination] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = (evt) => {
        evt.preventDefault();
        const formData = {
            email: email,
            name: name,
            denomination: denomination,
            password: password
        }
        AuthService.onRegister(formData)
            .then((results) => {
                setMessage(results.message);
                history.push('/login');
            })
            .catch((err) => {
                setMessage(err.message)
                console.log(err)
            })
    }
    return (
        <div className="register-container">
            <div className="register-background">
                <form className="register-form" onSubmit={handleRegister}>
                    <h3 className="register-title">Register</h3>
                    {message && <div className="error-message">{message}</div>}
                    <div className="input-form">
                        <label>Email</label><input className="text-field" type="text" name="email" value={email} onChange={(evt) => setEmail(evt.target.value)} placeholder="john.doe@gmail.com" />
                    </div>
                    <div className="input-form">
                        <label>Name</label><input className="text-field" type="text" name="name" value={name} onChange={(evt) => setName(evt.target.value)} placeholder="John Doe" />
                    </div>
                    <div className="input-form">
                        <label>Denomination</label><input className="text-field" type="text" name="denomination" value={denomination} onChange={(evt) => setDenomination(evt.target.value)} placeholder="jehovah's witness" />
                    </div>
                    <div className="input-form">
                        <label>Password</label><input className="text-field" type="password" name="password" value={password} onChange={(evt) => setPassword(evt.target.value)} placeholder="XXXXXXXXXXXX" />
                    </div>
                    <input className="btn-register" type="submit" value="Register" />
                    <div className="login-link">
                        <p>Need an Account?</p>
                        <input className="btn-login" type="submit" value="Back to Login!" onClick={() => history.push('/login')} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;
