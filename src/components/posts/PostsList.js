import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { Button, Flex, Text, Spinner } from "@chakra-ui/react";
import { TriangleUpIcon } from "@chakra-ui/icons";
import { tipAction } from "../../lightning/lnBits";
import { useSession } from "next-auth/react";

const PostsList = () => {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  const [loadingTip, setLoadingTip] = useState(false);

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
    <div className={styles.postsList}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <Flex
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
          >
            <h3>{post.title}</h3>
            <Flex flexDirection={"row"} alignItems={"center"}>
              {loadingTip === post.id ? (
                <Spinner size="xs" />
              ) : (
                <span>{post.tips}</span>
              )}
              <TriangleUpIcon />
            </Flex>
          </Flex>
          <Text>{post.description}</Text>
          <span>author: </span>
          <span>{post.author}</span>
          <Button
            colorScheme="blue"
            onClick={() => handleTip(post.author, session, post.id, post.tips)}
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
