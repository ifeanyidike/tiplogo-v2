# tiplogoshop

This project is temporarily hosted on [https://tiplogo.herokuapp.com](https://tiplogo.herokuapp.com)

This is a full MERN stack build with *React*, **Redux**, **Redux Thunk**, **Styled Components**, **Material UI**, **routing with React Router DOM**, **Advanced CSS** in the frontend 
and **Node.js**, **Express**, **JSON web token**, **REST API**, **MongoDB**, **Mongoose** in the backend.

## Tools used

### Frontend

- **React**
- **Redux**
- **React Redux**
- **Redux Thunk**
- **Styled Components**
- **Framer Motion**
- **JWT Decode**
- **Query String**
- **React Router DOM**
- **Axios**
- **React Paystack**
- **React UUID**
- **Pure React Carousel**
- **React Currency Format**
- **React Facebook Login**
- **Material UI**

### Backend

- **Express**
- **Mongoose**
- **JSON web token**
- **Multer**
- **Nodemailer**
- **Mailgun-js**
- **Bcrypt**
- **Node Fetch**
- **dotenv**
- **Express Async Handler**

It is a complex app but thanks to redux dev tools, I was able to effectively debug the redux states and make necessary corrections.

The app makes use of `full local authentication` and `facebook authentication` (both with JSON web token). This includes both users registration and login.
It also features `email confirmation` for registered users (Users cannot login until they confirm their emails), thanks to mailgun. 
I also implemented `Forget password` in the app.

Furthermore, I implemented a `robust payment system` in the app. `Payment` can be made via `wallet` or `Paystack`. Once payment is initiated an action is dispatched which immediately 
debits the amount, delivers the purchased item to the users' email and saves it in his profile, marks the orders as paid and subsequently as delivered when the delivery is successful,etc.
The `transaction is rolled back` if it is unsuccessful.

## Front end architecture
The frontend is structured in a very simple way. The reusable components are organized in the `components` folder. This folder has sub-folders which further organizes similar items
such as `Payment`, `Auth`, `Services`, etc. 
Also, the `redux` workflow is organized in a folder. This folder includes sub-folders namely `actions` for redux actions, `reducers`
for redux reducers, and `constants` for for redux action types or constants. I made use of Redux Thunk to return a function from the actions rather than an action object.
Also, `combineReducers` was used to combine the reducers before supplying them to the store. 
Additionally, **react router dom** is used for proper routing of the app. The pages are organized in a separate folder named `Pages`. This organization makes the project simple and easy to navigate.

## Back end architecture.
The backend is also structured in a simple way. The backend routes are organized in the `routes` folder. This folder contains the `authRoutes`, `cardRoutes`, `cardOrderRoutes`, etc.
The `controllers` folder contain the controllers which supply the functions needed by the routes. This contains the functionality that define the behavior of the app.
The routes are fed into the `server.js` app which controls the entire app. Also, the `middlewares` are stored in the middleware folder, and other utilities are stored in utils.

The app also has a robust admin backend to enable the site administrators seamlessly manage users, create and add cards, manage all orders and even upload files depending on user's actions. Users receive immediate update via their mail and their profiles (built into the app) when they perform any useful actions or when an admin responds to their queries. It also has a nice user profile that allows users to see and manage their orders, make payments for pending orders and so on.

