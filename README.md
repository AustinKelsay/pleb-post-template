# pleb-post
## A fullstack lightning app template built with NextJS

## Features:
 - User authentication with LNUrl-Auth
 - Onboarding flow with auth / wallet creation / user creation
 - Lightning wallet management with LNBits
 - MongoDB for storing Users and Posts
 - Next-Auth for Session management and authentication
 - Tipping flow for Posts


## (Easy setup) Using a hosted node with legend.lnbits
 1. Visit https://legend.lnbits.com/ and create a wallet with any name

<img width="1303" alt="image" src="https://user-images.githubusercontent.com/53542748/232330418-93a8cfe2-fa10-4eec-aac1-b81bc3b75af1.png">
 2. Click on the "extensions" tab in the sidebar and enable the User Manager extension

<img width="322" alt="image" src="https://user-images.githubusercontent.com/53542748/232330607-7649a303-0424-4c3c-98e5-b798932014f6.png">
 3. Now click on the User Manager extension on the sidebar. The wallet you are now in will be the admin for the user manager wallet:

<img width="1293" alt="image" src="https://user-images.githubusercontent.com/53542748/232330818-09f6499b-d2bd-402d-9887-3215b0da44e6.png">
   - Copy the URL and save it as the LN_BITS_USER_MANAGER_URL env variable in .env

<img width="608" alt="image" src="https://user-images.githubusercontent.com/53542748/232331415-93ae1c7f-2cbe-4304-bcbd-53fdea3cb4d9.png">
   - Click on the "Post user + initial wallet" tab on the right sidebar and copy the admin_id from the example request. Put this as the LN_BITS_ADMIN_ID env variable in your .env

<img width="522" alt="image" src="https://user-images.githubusercontent.com/53542748/232331722-88990620-8790-42e6-9b1d-415271fc7c62.png">
   - Now copy the X-Api-Key value from the same example request and set it as the LN_BITS_KEY env variable in your .env

<img width="519" alt="image" src="https://user-images.githubusercontent.com/53542748/232331938-da16752a-e1b1-4de6-8d2c-e0c236450e32.png">



## (Intermediate setup) Using your own node with Voltage
 1. Visit https://nodes.voltage.cloud
 2. Click 'Create Node'
<img width="814" alt="image" src="https://user-images.githubusercontent.com/53542748/232112545-e717f1ce-a451-484c-99e7-d3ae2a43a5bd.png">
 3. Choose LND
<img width="733" alt="image" src="https://user-images.githubusercontent.com/53542748/232112672-b40c9099-d620-41c9-a1b0-8ddc56284fb5.png">
 4. You can pick a Lite Node to start and use testnet if you ar still in development
<img width="890" alt="image" src="https://user-images.githubusercontent.com/53542748/232112940-9b66e05f-6c78-46b4-bb3d-7a821f79f0bb.png">
 5. 
