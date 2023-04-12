import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FormControl, Input, FormLabel, Button } from "@chakra-ui/react";
import axios from "axios";

const PostForm = () => {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/api/posts", {
        title: formData.title,
        description: formData.description,
        author: session.user.username,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <FormLabel>Description</FormLabel>
        <Input
          type="text"
          name="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </FormControl>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default PostForm;
