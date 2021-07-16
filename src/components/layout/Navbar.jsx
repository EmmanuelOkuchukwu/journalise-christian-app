import React from 'react';
import '../scss/navbar.scss';
import { AuthService } from '../../services/AuthenticationService';

const Navbar = ({ history, userInfo }) => {
    function handleLogout(evt) {
        evt.preventDefault();
        AuthService.onLogout();
        history.push('/');
    }
    return (
        <div className="navbar-container">
            <nav className="navbar-wrapper">
                <h1 className="journalise-header" onClick={() => history.push('/')}>Journalise</h1>
                <ul className="unordered-list">
                    {userInfo ? <li><a href="/" onClick={handleLogout}>logout</a></li> : <li><a href="/login">Login</a></li>}
                    {!userInfo ? <li><a href="/register">Register</a></li> : ''}
                    {userInfo ? <li><a href="/profile">{userInfo?.user?.name}</a></li> : ''}
                    {/*<li><a href=""></a></li>*/}
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;
