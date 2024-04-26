"use client";
import { statePosts } from "@/store/posts-store";
import { observer } from "mobx-react-lite";
import React from "react";
import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const RenderPost = observer(({ post, index, selectPost }) => {
  const currentPost = statePosts.getCurentPost();
  const isActive = currentPost && currentPost.id === post.id;
  console.log("рендер")
  return (
    <div>
      <div style={{ marginBottom: "20px", background: isActive ? "lightblue" : "transparent" }} key={post.id}>
        <p>Post: {index}</p>
        <p>userId: {post.userId}</p>
        <p>id: {post.id}</p>
        <p>title: {post.title}</p>
        <p>body: {post.body}</p>
        <button onClick={() => selectPost(index)}>Click me</button>
      </div>
    </div>
  );
});

const Posts = observer(() => {
  const { data: posts, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/posts?_limit=5",
    fetcher
  );

  const selectPost = (index) => {
    statePosts.setCurentPost(posts[index]);
  };

  if (isLoading) return <p>Загрузка....</p>;

  return (
    <div>
      {posts.map((post, index) => (
        <RenderPost
          post={post}
          index={index}
          selectPost={selectPost}
          key={post.id}
        />
      ))}
    </div>
  );
});

export default Posts;
