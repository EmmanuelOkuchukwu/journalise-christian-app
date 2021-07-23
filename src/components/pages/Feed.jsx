import React, { useState, useEffect } from 'react';
import { PostService } from '../../services/PostService';
import '../scss/feed.scss';

const Feed = () => {
    const [posts, setPosts] = useState([]);

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

    return (
        <div className="feed">
            <h2>Main Feed</h2>
            <hr />
            {posts?.posts?.length > 0 ? posts?.posts?.map(post => (
                <div className="post-stack" key={post?._id}>
                    <div className="feed-card">
                        <div className="flex">
                            <h3>{post?.title}</h3>
                            <i className="fas fa-trash" />
                        </div>
                        <img src={post?.photo} alt="" className="img-post" />
                    </div>
                </div>
            )): <span>No posts found here</span>}
        </div>
    )
}

export default Feed;
