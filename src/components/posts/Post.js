import React from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Spinner,
  Heading,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { TriangleUpIcon } from "@chakra-ui/icons";

const Post = ({ post, loadingTip, handleTip, session, status }) => {
  return (
    <Box
      backgroundColor="gray.700"
      color="white"
      p={8}
      borderRadius={6}
      my={3}
      w="100%"
    >
      <Flex
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
      >
        <Heading size="md" mb={2}>
          {post.title}
        </Heading>
        <HStack alignItems={"center"}>
          {loadingTip === post.id ? (
            // Show spinner while the post is being tipped
            <Spinner size="xs" />
          ) : (
            // Show the post's number of tips
            <Text>{post.tips}</Text>
          )}
          <TriangleUpIcon />
        </HStack>
      </Flex>
      <Stack spacing={3} mt={2}>
        <Text>{post.description}</Text>
        <Text>
          <Text as="span" fontWeight="bold">
            author:
          </Text>{" "}
          {post.author}
        </Text>
        <Text>
          <Text as="span" fontWeight="bold">
            created:
          </Text>{" "}
          <Text as="span">{new Date(post.created).toLocaleString()}</Text>
        </Text>
        {status === "authenticated" && session.user.pubkey !== post.author && (
          // Button to tip the post if the user is authenticated and not the author
          <Button
            colorScheme="blue"
            onClick={() => handleTip(post.author, session, post.id, post.tips)}
          >
            Tip
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default Post;
