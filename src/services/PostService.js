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

export const PostService = {
    getMyPosts,
    onDeletePost
}
