# Xaar

Xaar is a modern e-commerce platform built with ReactJS, NodeJS, and MongoDB. It features a fast and responsive interface for customers to browse products, manage their cart, and complete purchases easily. The site also includes an advanced admin dashboard for managing product inventory, tracking orders, and monitoring transactions.

<img src="https://user-images.githubusercontent.com/70820055/169712427-3979d61c-dbfe-4ef8-bc91-562df6cce9b3.gif" width="100%">

## Getting Started

To run the Xaar on your local machine, follow these steps:

1. Clone this repository to your local machine using the following command:

```
git clone https://github.com/kechayias/xaar.git
```

2. Set up a local MongoDB server. You can install MongoDB from [here](https://www.mongodb.com/try/download/community).

3. Set the `MONGODB_URL` environment variable to the following value:

```
mongodb://localhost/xaar
```

4. Install the required dependencies for the backend by running the following command in the root directory of the project:

```
npm install
```

5. Start the backend server by running the following command in the root directory of the project: 

```
npm run dev
```

6. Install the required dependencies for the frontend by running the following command in the `client` directory of the project:
 
```
cd client
npm install
```

7. Start the frontend server by running the following command in the `client` directory of the project: 

```
npm start
```

This will start the frontend server at `http://localhost:3000`.
That's it! You should now be able to access the XAAR by navigating to `http://localhost:3000` in your web browser.

## Features

The Xaar includes the following features:

- User authentication and authorization
- Product browsing and search
- Shopping cart functionality
- Payment processing with Stripe
- Order history and management

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE.md) file for details.
