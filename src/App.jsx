import React, { useState, useEffect } from 'react'
import api from './api';
import AuthForm from './AuthForm';
import CreatePost from './CreatePost';
import Posts from './Posts';
import Post from './Post';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import MostExpensivePost from './MostExpensivePost';

import { useNavigate, useParams, Link, Routes, Route } from 'react-router-dom';

function App() {
  const [auth, setAuth] = useState({});
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(()=> {
    const fetchPosts = async()=> {
      const posts = await api.fetchPosts();
      setPosts(posts);
    };
    fetchPosts();
  }, []);

  useEffect(()=> {
    const attemptLogin = async()=> {
      try {
        const _auth = await api.loginWithToken();
        setAuth(_auth);
      }
      catch(ex){
        console.log(ex);
      }
    };
    attemptLogin();
  }, []);

  const register = async(credentials)=> {
    const _auth = await api.register(credentials);
    setAuth(_auth);
  };

  const login = async(credentials)=> {
    const _auth = await api.login(credentials);
    setAuth(_auth);
  };

  const logout = ()=> {
    api.logout();
    setAuth({});
  };

  const createPost = async(post)=> {
    post = await api.createPost(post);
    setPosts([...posts, post]);
    navigate(`/posts/${post._id}`);
  };

  const onDelete = async (postId) => {
      await api.deletePost(postId);
      setPosts(posts.filter((post) => post._id !== postId));
      navigate('/');
  };

  return (
    <>
      <h1><Link to='/'>Strangers Things ({ posts.length })</Link></h1>
      {
        auth.username ? (
          <div>
            <h1>
              Welcome { auth.username }
              <button onClick={ logout }>Logout</button>
            </h1>
            <Link to='/posts/create'>Create A Post</Link>
            <Link to='/about_us'>About Us</Link>
            <Link to='/contact_us'>Contact Us</Link>
            <Link to='/most_expensive_post'>Go to Most Expensive Post</Link>
            <Routes>
              <Route path='/posts/create' element={ <CreatePost createPost={ createPost } />} />
            </Routes>
          </div>
        ): (
          <>
            <AuthForm submit={ register } txt='Register'/>
            <AuthForm submit={ login } txt='Login'/>
            <Link to='/about_us'>About Us</Link>
            <Link to='/contact_us'>Contact Us</Link>
          </>
        )
      }
      <Posts posts={ posts } auth={ auth } onDelete={onDelete}/>
      <Routes>
        <Route path='/most_expensive_post' element={<MostExpensivePost posts={posts} />} />
        <Route path='/posts/:id' element={ <Post posts={ posts } auth={ auth } onDelete={onDelete} />} />
        <Route path='/about_us' element={ <AboutUs />} />
        <Route path='/contact_us' element={<ContactUs/>} />
      </Routes>
    </>
  )
}

export default App
