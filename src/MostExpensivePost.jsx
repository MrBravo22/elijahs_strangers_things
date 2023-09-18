import React from 'react';

function MostExpensivePost({ posts }) {
  const findExpensivePost = () => {
    let mostExpensivePost = null;

    for (const post of posts) {
      if (!mostExpensivePost || post.price > mostExpensivePost.price) {
        mostExpensivePost = post;
      }
    }

    return mostExpensivePost;
  };

  const mostExpensivePost = findExpensivePost();

  
  return (
    <div>
      <h2>Most Expensive Post</h2>
      {mostExpensivePost ? (
        <div>
          <h3>{mostExpensivePost.title}</h3>
          <p>Price: ${mostExpensivePost.price}</p>
        </div>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}

export default MostExpensivePost;