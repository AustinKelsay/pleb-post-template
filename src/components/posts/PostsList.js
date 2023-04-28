import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { tipAction } from "../../lightning/lnBits";
import Post from "./Post";

const PostsList = () => {
  // Get user session status from NextAuth
  const { data: session, status } = useSession();
  // Set initial state for posts and loading status for tipping
  const [posts, setPosts] = useState([]);
  const [loadingTip, setLoadingTip] = useState(false);

  // Function to fetch posts from API
  const fetchPosts = () => {
    axios
      .get("/api/posts")
      .then((res) => {
        // Sort posts by date created (most recent first)
        const sortedPosts = res.data.sort(
          (a, b) => new Date(b.created) - new Date(a.created)
        );
        // Update state with sorted posts
        setPosts(sortedPosts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch posts from API when component mounts and every 3 seconds
  useEffect(() => {
    fetchPosts(); // Fetch posts immediately on mount

    const intervalId = setInterval(fetchPosts, 3000); // Fetch posts every 3 seconds

    return () => clearInterval(intervalId); // Cleanup function to clear interval
  }, []);

  // Handle tipping action
  const handleTip = async (author, session, id, tips) => {
    setLoadingTip(id);
    try {
      // Call tipAction function from lnBits.js to initiate tipping process
      const tipResponse = await tipAction(author, session);

      if (tipResponse) {
        // Update number of tips in database for given post
        await axios.put(`/api/posts/${id}`, { tips: tips + 1 });

        // Update state to reflect new number of tips for given post
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
    // Display posts in a flex column with centered alignment
    <Box
      d="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      maxWidth="800px"
    >
      {/* Map over posts and display Post component for each one */}
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
