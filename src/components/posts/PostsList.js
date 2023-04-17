import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { tipAction } from "../../lightning/lnBits";
import Post from "./Post";

const PostsList = () => {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  const [loadingTip, setLoadingTip] = useState(false);

  useEffect(() => {
    axios
      .get("/api/posts")
      .then((res) => {
        const sortedPosts = res.data.sort(
          (a, b) => new Date(b.created) - new Date(a.created)
        );
        setPosts(sortedPosts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleTip = async (author, session, id, tips) => {
    setLoadingTip(id);
    try {
      const tipResponse = await tipAction(author, session);

      if (tipResponse) {
        await axios.put(`/api/posts/${id}`, { tips: tips + 1 });

        setPosts(
          posts.map((post) => {
            if (post.id === id) {
              post.tips += 1;
            }
            return post;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingTip(null);
  };

  return (
    <Box
      d="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      maxWidth="800px"
    >
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          loadingTip={loadingTip}
          handleTip={handleTip}
          session={session}
          status={status}
        />
      ))}
    </Box>
  );
};

export default PostsList;
