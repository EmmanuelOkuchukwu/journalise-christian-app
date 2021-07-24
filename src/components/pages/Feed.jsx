import React, { useState, useEffect } from 'react';
import { PostService } from '../../services/PostService';
import '../scss/feed.scss';
import {AuthService} from "../../services/AuthenticationService";

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        function fetchPosts() {
            PostService.getAllPosts()
                .then((results) => {
                    setPosts(results);
                    console.log(results);
                    setIsLoading(true);
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false);
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
            <div className="feed-heading">
                <h2>Main Feed</h2>
                <hr />
            </div>
            {isLoading ?
                <div className="feed-section">
                    {posts?.posts?.length > 0 ? posts?.posts?.map(post => (
                        <div className="post-stack" key={post?._id}>
                            <div className="feed-card">
                                <div className="flex-header">
                                    <h3>{post?.title}</h3>
                                    {post.postedBy._id === userInfo.user._id && <i className="fas fa-trash" onClick={() => handleDelete(post._id)} />}
                                </div>
                                <img src={post?.photo} alt="" className="img-post" />
                            </div>
                        </div>
                    )): <span>No posts found here</span>
                    }
                </div> : <span>Posts are loading...</span>
            }
        </div>
    )
}

export default Feed;
