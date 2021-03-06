import React from "react";

import Messages from "./Messages";

const ShowPosts = (props) => {
  const { allPosts, setAllPosts, authorized, searchValue, currentUser } = props;

  const handleDelete = async (deletePost) => {
    console.log("deletePost: ", deletePost);
    const res = await fetch(
      `https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT/${deletePost}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authorized}`,
        },
      }
    );
    const data = await res.json();
    console.log("data ", data);
  };
  function fetchPosts() {
    return fetch(
      "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT/posts"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(searchValue);
        console.log(data);
        setAllPosts(data.data.posts);
      })
      .catch(console.error);
  }

  if (allPosts) {
    return allPosts.map(
      ({
        _id,
        title,
        description,
        location,
        author,
        price,
        createdAt,
        updatedAt,
        willDeliver,
      }) => (
        <div className="postBox" key={_id}>
          <span className="postTitle">
            Title: {title}, Price: {price}
          </span>
          <span className="postDescription"></span>
          <h4>Description: {description}</h4>
          <span className="postLocation">Location: {location} </span>
          <span className="postLocation">
            Delivery: {willDeliver ? "Yes" : "No"}{" "}
          </span>
          <span className="postAuthor">Created By: {author.username}</span>
          <span className="postCreatedUpdated">
            {createdAt}, {updatedAt}
          </span>
          <hr></hr>
          <hr></hr>
          {!authorized ? (
            "You are currently not logged in so you cannot send messages or create posts."
          ) : currentUser === author.username ? (
            <button
              type="button"
              className="postDelete"
              onClick={() => handleDelete(_id)}
            >
              Delete
            </button>
          ) : (
            <Messages _id={_id} authorized={authorized} />
          )}
        </div>
      )
    );
  } else {
    fetchPosts();
  }

  return <></>;
};

export default ShowPosts;