import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FormControl, Input, FormLabel, Button } from "@chakra-ui/react";
import styles from "./styles.module.css";
import axios from "axios";

const PostForm = () => {
  const { data: session, status } = useSession();
  const [showForm, setShowForm] = useState(false);
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
    <div className={styles.postForm}>
      <Button colorScheme={"blue"} onClick={() => setShowForm(!showForm)}>
        Add post
      </Button>
      {showForm && (
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <FormControl className={styles.formControl}>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </FormControl>
          <FormControl className={styles.formControl}>
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
          <Button colorScheme={"blue"} type="submit">
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};

export default PostForm;
