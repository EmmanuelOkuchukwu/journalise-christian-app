import axios from 'axios';
import AuthHeader from "../AuthHeader";

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
            return response;
        })
        .catch((error) => console.log(error));
}

function onUploadImage(data) {
    return axios.post('https://api.cloudinary.com/v1_1/emmanuel-cloud-storage/image/upload', data)
        .then((response) => {
            console.log('Uploaded Image: ', response.data)
            return response.data;
        })
        .catch(error => console.log(error));
}

export const PostService = {
    getMyPosts,
    onDeletePost,
    onCreatePost,
    onUploadImage
}
