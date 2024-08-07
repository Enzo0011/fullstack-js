# fullstack-js

> A Realtime Chat Application

A simple realtime chat apoplication made using [React JS](https://reactjs.org/docs/getting-started.html), a JavaScript library to make awesome UI by Facebook, [Node JS](https://nodejs.org/en/docs), [Express JS](https://expressjs.com/en/api.html) and [MongoDB](https://docs.mongodb.com/).

This application uses [React JS](https://reactjs.org/docs/getting-started.html) component oriented UI creation paradigm. All components are written in [JSX](https://reactjs.org/docs/jsx-in-depth.html) and ES6 style.

Back end is implemented using [Node JS](https://nodejs.org/en/docs), [Express JS](https://expressjs.com/en/api.html) and [MongoDB](https://docs.mongodb.com/). [Atlas](https://www.mongodb.com/cloud/atlas), the _Cloud_ version of [MongoDB](https://docs.mongodb.com/) is used. Real time communication is done using [Socket.io](https://www.npmjs.com/package/socket.io).

### Screenshots

![Login](/screenshots/4.png "Login")
![Homepage](/screenshots/2.png "Homepage")
![Createroom](/screenshots/3.png "Createroom")
![Chatroom](/screenshots/1.png "Chatroom")


## Features

- Latest features of JavaScript i.e. ES6, ES7, ES8 is used
- [React JS Hooks](https://reactjs.org/docs/hooks-intro.html) are used with Functional components
- ES8 `async/await` is used

<br/>

<ul>
 <li> This is Simple Chat Application </li>
 <li> It is a Full Stack Application </li>
 <li>All the data are stored in the [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) </li>
 <li>Login/Signup as well as Logout feature is added </li>
 <li>Error will be shown if the credentials are not correct</li>
 <li>Shows realtime message when a user joins/leaves the room</li>
 <li>User can send emojis along with text which is also persistent</li>
 <li>Real time communication is supported using <a href="https://www.npmjs.com/package/socket.io">Socket.io</a></li>
 <li> All the conversation are stored in the database i.e. <i>persistant</i>
</ul>


## Tech Stack

MongoDB, Express, React, Node, Socket.IO, Tailwind CSS

### Env Variables

Create a .env file in the server folder and add the following

```
MONGODB_URL=<YOUR_MONGO_DB_URL>
JWT_SERVER_SECRET=<YOUR_SECRET_KEY>
NODE_ENV="development"
```

### Install Dependencies & Run

```
npx yarn
npx yarn dev
cd client
npx yarn
npx yarn dev
```


