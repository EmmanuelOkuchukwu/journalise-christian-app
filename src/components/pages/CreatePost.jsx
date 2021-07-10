import React, { useState, useEffect } from 'react';
import '../scss/createPost.scss';
import { PostService } from '../../services/PostService';

const CreatePost = () => {
    const initialState = {
        title: '',
        body: '',
        url: ''
    }
    const [posts, setPosts] = useState(initialState);
    const [image, setImage] = useState('');

    const uploadImage = () => {
        let data = new FormData();
        data.append('file', image);
        data.append('upload', 'christ-centered-app');
        data.append('cloud_name', 'emmanuel-cloud-storage');
        PostService.onUploadImage(data)
            .then((results) => {
                setImage(results.url);
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className="form-background">
            <form className="create-posts-form">
                <h2>Create Post</h2>
                <input type="text" className="form-input" name="title" placeholder="Title here" />
                <input type="text" className="form-input" name="body" placeholder="Description here" />
                <input type="file" name="image" />
                <input type="submit" className="btn-submit" />
            </form>
        </div>
    )
}

export default CreatePost;
