import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

function onLogin(email, password) {
    return axios.post('/signin', {
        email, password,
        headers: {
            'content-type': 'application/json'
        }
    })
        .then((response) => {
            if(response.data.token) {
                localStorage.setItem('currentUser', JSON.stringify(response.data));
                currentUserSubject.next(response.data);
            }
            return response.data;
        })
}

function onRegister(formData) {
    return axios.post('/signup', formData, {
        headers: {
            'content-type': 'application/json'
        }
    })
        .then((response) => {
            return response;
        })
        .catch(error => console.log(error));
}

function onLogout() {
    localStorage.clear();
    currentUserSubject.next(null)
}
function onGetCurrentUser() {}

export const AuthService = {
    onLogin,
    onLogout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value
    },
    onRegister,
    onGetCurrentUser
}
