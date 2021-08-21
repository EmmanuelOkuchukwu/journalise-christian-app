import axios from 'axios';
import AuthHeader from "../AuthHeader";

function getAllPosts() {
    return axios.get('/allpost')
        .then((response) => {
            if(response.status === 200) {
                return response.data;
            } else if(response.status === 422) {
                return null;
            }
        })
        .catch(error => console.log(error));
}

function getMyPosts() {
    return axios.get('/mypost', {
        headers: AuthHeader()
    })
        .then((response) => {
            if(response.status === 200) {
                return response.data;
            }
        })
        .catch(error => console.log(error));
}

function onDeletePost(id) {
    return axios.delete('/deletepost/' + id, {
        headers: AuthHeader()
    })
        .then((response) => {
            if(response.status === 200) {
                return response;
            }
        })
        .catch(error => console.log(error));
}

function onCreatePost(formData) {
    const AuthorizationHeader = AuthHeader();
    AuthorizationHeader['Content-Type'] = 'application/json';
    return axios.post('/createpost', formData,{
        headers: AuthorizationHeader
    })
        .then((response) => {
            return response.data;
        })
        .catch((error) => console.log(error));
}

function onLike() {}

function onComment() {}

export const PostService = {
    getAllPosts,
    getMyPosts,
    onDeletePost,
    onCreatePost,
    onLike,
    onComment
}
