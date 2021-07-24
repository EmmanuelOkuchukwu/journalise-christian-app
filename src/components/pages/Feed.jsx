import React, { useState, useEffect } from 'react';
import { PostService } from '../../services/PostService';
import '../scss/feed.scss';
import {AuthService} from "../../services/AuthenticationService";

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        function fetchPosts() {
            PostService.getAllPosts()
                .then((results) => {
                    setPosts(results);
                    console.log(results);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        return fetchPosts();
    }, []);

    useEffect(() => {
        const getUser = () => {
            AuthService.currentUser.subscribe(user => {
                setUserInfo(user);
            })
        }
        return getUser();
    }, [])

    function handleDelete(id) {
        PostService.onDeletePost(id)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className="feed">
            <h2>Main Feed</h2>
            <hr />
            {posts?.posts?.length > 0 ? posts?.posts?.map(post => (
                <div className="post-stack" key={post?._id}>
                    <div className="feed-card">
                        <div className="flex-header">
                            <h3>{post?.title}</h3>
                            {!userInfo && <i className="fas fa-trash" onClick={() => handleDelete(post._id)} />}
                        </div>
                        <img src={post?.photo} alt="" className="img-post" />
                    </div>
                </div>
            )): <span>No posts found here</span>}
        </div>
    )
}

export default Feed;
