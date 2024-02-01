# Payments app

### Project URL - https://payments-frontend.onrender.com

## Setup and Instructions

### Frontend
- From the root directory change the directory to client using "cd client"
- Install all the dependencies using "npm install"
- Use command "npm run dev" to start the server


### Backend
- From the root directory change the directory to server using "cd server"
- Install all the dependencies using "npm install"
- Set Up the .env file taking reference from the .env.example file
- Use command "npm run dev" to start the server

### Features

- In the Products Page Click on Buy Now button to make payment for the given product
- You will be redirected to stripe payments page
- If stripe is not working it will automatically open razorpay payment gateway
- Once payment is completed you will be automatically redirected to payments successful page and payments failure page respectively
- You can save your cards and details in the Payments Page
- If you are logged in and have already saved your cards you can access them also in the payments page
- You can update your card details also

### Tech Stack

- For frontend I have used react.js, TailwindCSS
- Backend is built upon Node.js, Express.js
- Database : MongoDB