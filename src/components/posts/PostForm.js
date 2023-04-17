import React, { useState } from "react";
import { useSession } from "next-auth/react";
import {
  FormControl,
  Input,
  FormLabel,
  Button,
  VStack,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";

const PostForm = () => {
  // Use the NextAuth session hook to get session data and status
  const { data: session, status } = useSession();
  // Use the Next.js router to programmatically navigate or reload the page
  const router = useRouter();
  // State to toggle the visibility of the form
  const [showForm, setShowForm] = useState(false);
  // State to store form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
  });

  // Handle form submission
  const handleSubmit = (event) => {
    // Prevent default form submission behavior
    event.preventDefault();

    // Make a POST request to the /api/posts endpoint with form data
    axios
      .post("/api/posts", {
        title: formData.title,
        description: formData.description,
        author: session.user.username,
      })
      .then((res) => {
        // Reload the page after successful submission
        router.reload();
      })
      .catch((err) => {
        // Log any errors that occur during the request
        console.log("error", err);
      });
  };

  return (
    // Only show the form if the user is authenticated
    status === "authenticated" && (
      <VStack align="center" pt={4}>
        {/* Button to toggle the visibility of the form */}
        <Button colorScheme={"blue"} onClick={() => setShowForm(!showForm)}>
          Add post
        </Button>
        {/* Conditionally render the form based on the showForm state */}
        {showForm && (
          <Box
            as={"form"}
            onSubmit={(e) => handleSubmit(e)}
            bg={"#2D3748"}
            color={"#F7FAFC"}
            mt={4}
            p={8}
            borderRadius={"md"}
            w={"100%"}
            minW={"800px"}
            maxW={"800px"}
          >
            {/* Form control for the post title */}
            <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                type={"text"}
                name={"title"}
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </FormControl>
            {/* Form control for the post description */}
            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Input
                type={"text"}
                name={"description"}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </FormControl>
            {/* Submit button to submit the form */}
            <Button colorScheme={"blue"} type={"submit"}>
              Submit
            </Button>
          </Box>
        )}
      </VStack>
    )
  );
};

export default PostForm;
