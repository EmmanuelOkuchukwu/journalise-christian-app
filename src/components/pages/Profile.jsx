import React, {useEffect, useState} from 'react';
import '../scss/profile.scss';
import { AuthService } from '../../services/AuthenticationService';
import { PostService } from '../../services/PostService';
import CreatePost from './CreatePost';

const Profile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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
                setIsLoading(true);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            })
        }
        return fetchMyPosts();
    }, [])

    const handleDeletePost = (id) => {
        PostService.onDeletePost(id)
            .then((result) => {
                if(result) {
                    const deletePost = result?.mypost?.filter(post => {
                        return post._id !== id
                    })
                    setPosts(deletePost);
                } else {
                    return null;
                }
            })
    }

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
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
                    <li><a href="/">Home</a></li>
                    <li><a href="/feed">Main Feed</a></li>
                    <li><a href="">Add New Prayer</a></li>
                    <li><a href="">Prayer Requests</a></li>
                </ul>
            </nav>
            <div className="profile-wrapper">
                <div className="user-info-section">
                    <div className="user-detail">
                        <h2>User Information:</h2>
                        <p>Name: {userInfo?.user?.name}</p>
                        <p>Email: {userInfo?.user?.email}</p>
                        <p>Denomination: {userInfo?.user?.denomination}</p>
                    </div>
                    <div className="create-post">
                        <CreatePost />
                    </div>
                </div>
                {isLoading ?
                    <div className="post-section">
                        {posts?.mypost?.length > 0 ? posts?.mypost?.map(post => (
                            <div className="post-card" key={post._id}>
                                <div className="post-card-header">
                                    <h2>{post.title}</h2>
                                    {userInfo && <i className="fas fa-trash" onClick={() => handleDeletePost(post._id)} />}
                                </div>
                                <img src={post.photo} alt="" className="card-img" width="600" height="400" />
                                <p>{truncate(post.body, 50)}</p>
                            </div>
                        )): <p className="no-posts-found">No Posts Found!</p>}
                    </div> : <p>Posts are currently loading...</p>
                }
            </div>
        </div>
    )
}

export default Profile;
