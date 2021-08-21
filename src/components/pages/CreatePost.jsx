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
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = evt => {
        const { name } = evt.target;
        setPosts({ ...posts, [name]: evt.target.value });
    }

    const submitPost = (evt) => {
        setIsLoading(true);
        evt.preventDefault();
        let formData = {
            title: posts.title,
            body: posts.body,
            pic: posts.url
        }
        PostService.onCreatePost(formData)
            .then((success) => {
                console.log(success);
                setPosts({
                    title: posts.title,
                    body: posts.body,
                    pic: posts.url
                })
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }

    return (
        <div className="form-background">
            <form className="create-posts-form" onSubmit={submitPost}>
                <h2>Create Post</h2>
                <input type="text" className="form-input" value={posts.title} onChange={handleChange} name="title" placeholder="Title here" />
                <input type="text" className="form-input" value={posts.body} onChange={handleChange} name="body" placeholder="Description here" />
                <input type="text" className="form-input" name="url" value={posts.url} onChange={handleChange} placeholder="Image URL here" />
                <button type="submit" className="btn-submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Create Post'}</button>
            </form>
        </div>
    )
}

export default CreatePost;
