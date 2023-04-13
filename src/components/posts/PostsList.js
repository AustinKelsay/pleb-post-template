import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";
// import { tipAction } from "../../flows/tipping";
import { useSession } from "next-auth/react";

const PostsList = () => {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.postsList}>
      {posts.map((post) => (
        <div className={styles.post} key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <span>author: </span>
          <span>{post.author}</span>
          <Button
            colorScheme="blue"
            // onClick={() => tipAction(post.author, session)}
            disabled={status !== "authenticated"}
          >
            Tip
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
