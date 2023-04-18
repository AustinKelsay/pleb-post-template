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

 3. Now click on the User Manager extension on the sidebar. The wallet you are now in will be the admin for the user manager wallet

<img width="1293" alt="image" src="https://user-images.githubusercontent.com/53542748/232330818-09f6499b-d2bd-402d-9887-3215b0da44e6.png">

 4. Copy the URL and save it as the LN_BITS_USER_MANAGER_URL env variable in .env

<img width="608" alt="image" src="https://user-images.githubusercontent.com/53542748/232331415-93ae1c7f-2cbe-4304-bcbd-53fdea3cb4d9.png">

 5. Click on the "Post user + initial wallet" tab on the right sidebar and copy the admin_id from the example request. Put this as the LN_BITS_ADMIN_ID env variable in your .env

<img width="522" alt="image" src="https://user-images.githubusercontent.com/53542748/232331722-88990620-8790-42e6-9b1d-415271fc7c62.png">

 6. Now copy the X-Api-Key value from the same example request and set it as the LN_BITS_KEY env variable in your .env

<img width="519" alt="image" src="https://user-images.githubusercontent.com/53542748/232331938-da16752a-e1b1-4de6-8d2c-e0c236450e32.png">



## (Intermediate setup) Using your own node with Voltage
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
