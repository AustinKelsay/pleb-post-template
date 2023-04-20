# Environment variables

Environment variables are essential for managing sensitive data, such as API keys and database credentials, without exposing them in your code. When running your application locally, you'll typically use a .env file to store these variables. In the provided template, there's a .env.sample file that you can use as a reference for creating your own .env file locally.

However, when using Replit, we need to handle environment variables differently. Replit provides a built-in feature called Secrets that allows you to securely store environment variables directly in the Replit user interface.

## How we will setup our environment variables in thsi workshop

I have already provided most of the environment variables needed for pleb-post baked into this replit. For example the MONGO_URI variable which is a required for the connection to a database is already setup for you in here.

However we will walkthrough setting up our own individual LNBits instances in the following steps.


**You can see all of the environment variables being used in pleb-post and their descriptions in .env.sample**

## Here's a guide on how to use Secrets in Replit:

- In your Replit project, click on the padlock icon located in the left sidebar to open the Secrets tab.
Replit Secrets Tab
- Add your environment variables as key-value pairs. The keys should match the variable names that will be presented in this guide, and the values should be the corresponding credentials or data.
- Once you've added your secrets, Replit will automatically manage these variables for you. They will be accessible within your code using process.env.YOUR_VARIABLE_NAME just like you would with a .env file.
- Note: Secrets are encrypted and securely stored. They are only accessible within your Replit project and won't be exposed in your code or version control.


With this setup, you can easily manage your environment variables in both local and Replit environments without compromising security.