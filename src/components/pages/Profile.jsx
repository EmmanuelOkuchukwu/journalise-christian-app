import React, {useEffect, useState} from 'react';
import '../scss/profile.scss';
import { AuthService } from '../../services/AuthenticationService';
import { PostService } from '../../services/PostService';
import CreatePost from './CreatePost';

const Profile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const getUser = () => {
            AuthService.currentUser.subscribe(user => {
                setUserInfo(user);
            })
        }
        return getUser();
    }, [])
    useEffect(() => {
        const fetchMyPosts = () => {
            PostService.getMyPosts()
            .then((results) => {
                setPosts(results);
                console.log(results);
            })
            .catch((err) => {
                console.log(err);
            })
        }
        return fetchMyPosts();
    }, [])

    const handleDeletePost = (id) => {
        PostService.onDeletePost(id)
            .then((result) => {
                if(result) {
                    const deletePost = posts?.mypost?.filter(post => {
                        return post._id !== id
                    })
                    setPosts(deletePost)
                } else {
                    return null
                }
            })
    }

    return (
        <div className="profile-container">
            <div className="profile-banner">
                <div className="user-banner">
                    <div className="img-profile">
                        <img src={userInfo?.user?.pic} alt="" className="img" width="600" height="400" />
                    </div>
                    <p>{userInfo?.user?.name}</p>
                </div>
            </div>
            <nav className="profile-nav">
                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">Main Feed</a></li>
                    <li><a href="">Add New Post</a></li>
                    <li><a href="">Prayer Requests</a></li>
                </ul>
            </nav>
            <div className="profile-wrapper">
                <div className="user-info-section">
                    <div className="user-detail">
                        <p>Name: {userInfo?.user?.name}</p>
                        <p>Email: {userInfo?.user?.email}</p>
                        <p>Denomination: {userInfo?.user?.denomination}</p>
                    </div>
                    <div className="create-post">
                        <CreatePost />
                    </div>
                </div>
                <div className="post-section">
                    {posts?.mypost?.length > 0 ? posts?.mypost?.map(post => (
                        <div className="post-card" key={post._id}>
                            <div className="post-card-header">
                                <h2>{post.title}</h2>
                                <i className="fas fa-trash" onClick={() => handleDeletePost(post._id)} />
                            </div>
                            <img src={post.photo} alt="" className="card-img" width="600" height="400" />
                        </div>
                    )): <p className="no-posts-found">No Posts Found!</p>}
                </div>
            </div>
        </div>
    )
}

export default Profile;
