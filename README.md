# 'News Explorer' Back End

This project is the back-end for the ["News Explorer"](https://github.com/toriroe/newsexplorer_frontend) Create React app project. It's an API that is responsible for routing HTTP requests that interact with a database in order to register new users, login, and get, add, and remove articles from the saved news articles page.

Authorization middleware is implemented for verifying tokens upon returning to the site after previously being logged in. Middelware for centralized error handling and logging is also used. Incoming data is validated using the Joi library.

It is currently being deployed and hosted on Google Cloud. Site is encrypted with an SSL certificate via certbot.

## Technologies Used

- This is a Node.js app using Express.js framework
- Mongoose is used to interact with a MongoDB database
- pm2 process manager is used to keep app running continuously
- nginx for port configuration/redirecting requests

## Links

- [Link to site](https://api.newsexplorer.mnode.net)
