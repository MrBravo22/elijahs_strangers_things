import React from 'react';
import { Link } from 'react-router-dom';


const Posts = ({ posts, auth, onDelete })=> {


  const handleDelete = (postId) => {
    onDelete(postId);
  }
  return (
    <ul>
      {
        posts.map( post => {
          return (
            <li key={ post._id } className={ post.author._id === auth._id ? 'mine': ''}>
              <Link to={`/posts/${post._id}`}>{ post.title }</Link> ${ (post.price*1).toFixed(2) }
              <span> posted by {post.author.username} </span>
              <p>{post.description}</p>
              <button onClick={() => handleDelete(post._id)}>Delete</button>

            </li>
          );
        })
      }
    </ul>
  );
};

export default Posts;

