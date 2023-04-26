# Environment variables

Environment variables are essential for managing sensitive data, such as API keys and database credentials, without exposing them in your code. When running your application locally, you'll typically use a .env file to store these variables. In the provided template, there's a .env.sample file that you can use as a reference for creating your own .env file locally.

## How we will setup our environment variables in this workshop

I have already provided most of the environment variables needed for pleb-post baked into this replit. For example the MONGO_URI variable which is a required for the connection to a database is already setup for you in here.

However we will walkthrough setting up our own individual LNBits instances in the following steps.

**You can see all of the environment variables being used in pleb-post and their descriptions in .env.sample**

## Here's how we will use our environment variables in Replit:

1. Rename your .env.sample file to .env.local.
2. Now the local project will detect these variables in that file.
3. As we go through the setup of our own LNBits instance we will add a few additional environment variables to .env.local