# pleb-post: A fullstack lightning app template built with NextJS

# Table of Contents

- [Features](#features)
- [Setup](#setup)
  - [Environment Variables](#environment-variables)
  - [MongoDB Configuration](#mongodb-configuration)
  - [Quickest: Using a hosted node with legend.lnbits](#quickest-using-a-hosted-node-with-legend-lnbits)
  - [Using your own node with Voltage](#using-your-own-node-with-voltage)

# Features: <a name="features"></a>
 - User authentication with LNUrl-Auth
 - Onboarding flow with auth / wallet creation / user creation
 - Lightning wallet management with LNBits
 - MongoDB for storing Users and Posts
 - Next-Auth for Session management and authentication
 - Tipping flow for Posts


# Setup <a name="setup"></a>

## Environment Variables <a name="environment-variables"></a>

If you are running locally you need to rename .env.sample to .env

.env.sample contains all of the necessary environment variables (some of them being optional/prefilled) with comments describing their purpose.

## MongoDB Configuration <a name="mongodb-configuration"></a>

In .env.sample there is an environment variable MONGO_URI you can set with your MongoDB connection string. If you are familiar with MongoDB, you can use your existing MongoDB instance by providing the connection string. If you don't have a MongoDB instance or are new to it, follow the steps below to set up a free serverless instance with MongoDB Atlas.

 1. Visit [MongoDB Atlas](https://www.mongodb.com) and sign up for a new account or log in to your existing account.

 2. Click on "Create a New Cluster" and choose the "Free Shared" tier.

<img width="730" alt="image" src="https://user-images.githubusercontent.com/53542748/233101706-777a1dcb-95c3-4a1a-8222-1d8c67781fad.png">

 3. Select your preferred cloud provider, region, and choose a name for your cluster. Then, click on "Create Cluster" to start the deployment process. This may take a few minutes.

<img width="683" alt="image" src="https://user-images.githubusercontent.com/53542748/233101847-6c60e19b-f434-4caa-8448-a39b721b0ddf.png">

 4. Once the cluster is deployed, click on "Connect" to set up the connection to your cluster.

<img width="855" alt="image" src="https://user-images.githubusercontent.com/53542748/233103688-4c578c35-54fd-4f10-9908-da4f3a2351fb.png">

 5. In the "Connect to Your Cluster" window, click on "Connect to your application." which might be called "Drivers"

<img width="616" alt="image" src="https://user-images.githubusercontent.com/53542748/233103374-a0824e4a-134f-4913-afe0-339e201d629d.png">

 6. Choose your preferred driver and version. Copy the connection string provided.

 7. Replace <password> with the password you created for your MongoDB user and <dbname> with the name of your database (e.g., pleb-post). It should look something like this: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority`
  
   - If you haven't made a MongoDB user yet, follow these steps:

   - Click on the "Database Access" tab on the left sidebar.

      <img width="100" alt="image" src="https://user-images.githubusercontent.com/53542748/233104485-1d66c6e8-d44b-4c56-aa64-c5d528afc2a0.png">
  
   - Click "Add New Database User".
  
      <img width="800" alt="image" src="https://user-images.githubusercontent.com/53542748/233104869-0da7bd44-f689-4c47-bc86-3eaca93759b3.png">

   - Type in a username / password for this user and choose their permissions. Now this username and password can be used directly in your mongo uri string.

 8. Finally, paste the connection string into the .env file as the value for MONGO_URI.

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
```

Now your MongoDB instance is connected, and the application will use it to store Users and Posts data.

## (Quickest) Using a hosted node with legend.lnbits <a name="quickest-using-a-hosted-node-with-legend-lnbits"></a>

 1. Visit https://legend.lnbits.com/ and create a wallet with any name

<img width="1303" alt="image" src="https://user-images.githubusercontent.com/53542748/232330418-93a8cfe2-fa10-4eec-aac1-b81bc3b75af1.png">

 2. Click on the "extensions" tab in the sidebar and enable the User Manager extension

<img width="322" alt="image" src="https://user-images.githubusercontent.com/53542748/232330607-7649a303-0424-4c3c-98e5-b798932014f6.png">

 3. Now click on the User Manager extension on the sidebar. The wallet you are now in will be the admin for the user manager wallet

<img width="1293" alt="image" src="https://user-images.githubusercontent.com/53542748/232330818-09f6499b-d2bd-402d-9887-3215b0da44e6.png">

 4. Copy the URL and save it as the LN_BITS_USER_MANAGER_URL env variable in .env

<img width="608" alt="image" src="https://user-images.githubusercontent.com/53542748/232331415-93ae1c7f-2cbe-4304-bcbd-53fdea3cb4d9.png">

 5. Click on the "Post user + initial wallet" tab on the right sidebar and copy the admin_id from the example request. Put this as the LN_BITS_ADMIN_ID env variable in your .env

<img width="522" alt="image" src="https://user-images.githubusercontent.com/53542748/232331722-88990620-8790-42e6-9b1d-415271fc7c62.png">

 6. Now copy the X-Api-Key value from the same example request and set it as the LN_BITS_KEY env variable in your .env

<img width="519" alt="image" src="https://user-images.githubusercontent.com/53542748/232331938-da16752a-e1b1-4de6-8d2c-e0c236450e32.png">



## Using your own node with Voltage <a name="using-your-own-node-with-voltage"></a>

 1. Visit https://nodes.voltage.cloud

 2. Click 'Create Node'

<img width="814" alt="image" src="https://user-images.githubusercontent.com/53542748/232112545-e717f1ce-a451-484c-99e7-d3ae2a43a5bd.png">

 3. Choose LND

<img width="733" alt="image" src="https://user-images.githubusercontent.com/53542748/232112672-b40c9099-d620-41c9-a1b0-8ddc56284fb5.png">

 4. You can pick a Lite Node to start and use testnet if you are still in development or mainnet if you just wanna start ripping some real invoices

<img width="890" alt="image" src="https://user-images.githubusercontent.com/53542748/232112940-9b66e05f-6c78-46b4-bb3d-7a821f79f0bb.png">

 5. Create a username and password for your node and be sure to write them down

<img width="711" alt="image" src="https://user-images.githubusercontent.com/53542748/232906941-b2df464b-ffeb-4499-a089-d27d7a26c374.png">

 6. After your node is done initializing you should see this message on your node's home page to request a free inbound channel! This will allow us to instantly start receiving sats into our LNBits instance from the wider network.
 
<img width="807" alt="image" src="https://user-images.githubusercontent.com/53542748/232912525-cf09d345-9664-4f0c-be8c-b9617800aefd.png">

 7. Now go to the dashboards page in the sidebar and click 'Create Dashboard' under LNBits

<img width="1179" alt="image" src="https://user-images.githubusercontent.com/53542748/232907629-d5328403-b7cd-4cea-92f0-8309dd98fdba.png">

 8. Once LNBits is initialized you can click 'Launch Dashboard' and put in your node's password to login

<img width="901" alt="image" src="https://user-images.githubusercontent.com/53542748/232908022-8789e0af-f30d-4cc8-8116-56988bc0e445.png">

 9. Now click on the 'Manage Extensions' tab in the left sidebar, scroll down to the "User Manager" extension and click "enable"

<img width="317" alt="image" src="https://user-images.githubusercontent.com/53542748/232908673-94e1659d-bf02-4b03-84ce-9cb2c7f44dc7.png">

 10. Now click on the User Manager extension on the sidebar. The wallet you are now in will be the admin for the user manager wallet

<img width="933" alt="image" src="https://user-images.githubusercontent.com/53542748/232908785-1ec60f88-9245-44e9-b326-702b8fe46d6b.png">

 11. Copy the URL and save it as the LN_BITS_USER_MANAGER_URL env variable in .env

<img width="653" alt="image" src="https://user-images.githubusercontent.com/53542748/232909161-3634dd20-c71a-4b32-bf93-683373fbd326.png">

 12. Click on the "Post user + initial wallet" tab on the right sidebar and copy the admin_id from the example request. Put this as the LN_BITS_ADMIN_ID env variable in your .env

<img width="471" alt="image" src="https://user-images.githubusercontent.com/53542748/232909406-a52ef563-56a0-418c-b65e-13402de5b01b.png">

 13. Now copy the X-Api-Key value from the same example request and set it as the LN_BITS_KEY env variable in your .env

<img width="476" alt="image" src="https://user-images.githubusercontent.com/53542748/232909539-9575406f-f8bd-4f37-8a9f-bd027c1d4ec9.png">


Great now you have your own LNBits instance running on your Voltage node and with these ENV variables updated pleb-post will now be integrated!
Once your free inbound channel from Voltage is confirmed you should be able to start sending sats into any of your LNBits wallets (though you will need to open a well connected outbound channel to spend out of your instance to the wider network)
