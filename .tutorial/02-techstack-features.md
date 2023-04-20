# Techstack
- [NextJS](https://nextjs.org): Frontend client / server & API, providing a seamless development experience and server-side rendering for better performance and developer experience.
- [ChakraUI](https://chakra-ui.com): Frontend component library, offering a consistent and responsive design system with a focus on accessibility and customizability.
- [MongoDB](https://www.mongodb.com): A scalable and flexible NoSQL database used for storing the application's data, such as Users and Posts.
- [Mongoose](https://mongoosejs.com): An Object Data Modeling (ODM) library for MongoDB, which simplifies database interactions and provides schema validation, query building, and middleware support.
- [NextAuth](https://next-auth.js.org): A complete authentication solution for Next.js applications, handling user registration, login, and session management.
- [LNBits](https://lnbits.com): A lightweight and extensible Bitcoin Lightning wallet management system, used for managing users' Lightning wallets and processing Lightning Network transactions.


# Features
- User authentication with LNUrl-Auth: Secure and seamless authentication method that uses the user's Lightning wallet to signup or signin
- Next-Auth for Session management and authorization: Manages user sessions and provides a secure way to protect routes and do simple authorization checks across your app.
- MongoDB for storing Users and Posts: A reliable and scalable database solution using the Mongoose ODM allowing for an extremely quick and simple database setup
- Lightning wallet management with LNBits: Enables users to create, manage, and use Lightning wallets, facilitating Bitcoin transactions within the platform.
- Onboarding flow with auth / wallet creation / user creation: A simple but comprehensive onboarding process that seamlessly signs up users, creates a personal LNBits wallet for them, saves all of the relevant info in the database, passes it through an encrypted session to the client, and allows users to always sign back in with the same wallet. 
- Tipping flow for Posts: A simple replicatable tipping flow users to send 1 sat tips on any post from their LNbits vwallet to another users wallet.