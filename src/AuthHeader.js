import { AuthService } from './services/AuthenticationService';

export default function AuthHeader() {
    const currentUser = AuthService.currentUserValue;
    if(currentUser && currentUser.token) {
       return { Authorization: `Bearer ${currentUser.token}` }
    } else {
        return {}
    }
}
