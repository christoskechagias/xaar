## Xaar

Xaar is an ecommerce site built using modern web development technologies, including ReactJS for the frontend, NodeJS for the backend, and MongoDB for the database. The site is designed to be fast, responsive, and user-friendly, with an intuitive interface that allows customers to easily browse through the available products, add items to their cart, and complete their purchase with minimal effort.

One of the key features of XAAR is its support for multiple payment options, including PayPal and Stripe. This was achieved by integrating with the PayPal and Stripe APIs, allowing customers to choose the payment method that works best for them. The checkout process is simple and streamlined, ensuring a smooth experience for the customer.

Xaar also includes an advanced admin dashboard that enables administrators to manage the product inventory, view the order list, and monitor ongoing transactions. This was achieved by implementing a custom backend using NodeJS, which interfaces with the MongoDB database and provides a RESTful API for the frontend to consume.

The frontend of Xaar was built using ReactJS, which provides a powerful and flexible framework for building modern web applications. The codebase was structured using best practices such as component-based architecture, separation of concerns, and modularity, which makes it easy to maintain and extend over time.

Overall, Xaar is a high-quality ecommerce site that showcases the power and potential of modern web development technologies. It combines a fast, responsive frontend with a powerful, scalable backend to provide a seamless experience for customers and administrators alike.

![xaar](https://user-images.githubusercontent.com/70820055/169712427-3979d61c-dbfe-4ef8-bc91-562df6cce9b3.gif)

https://xaar.herokuapp.com

## Getting Started

To run the Xaar on your local machine, follow these steps:

1. Clone this repository to your local machine using the following command:

```
$ git clone https://github.com/kechayias/xaar.git
```

2. Set up a local MongoDB server. You can install MongoDB from [here](https://www.mongodb.com/try/download/community).

3. Set the `MONGODB_URL` environment variable to the following value:

```
mongodb://localhost/xaar
```

4. Install the required dependencies for the backend by running the following command in the root directory of the project:

```
$ npm install
```

5. Start the backend server by running the following command in the root directory of the project: 

```
$ npm run dev
```

6. Install the required dependencies for the frontend by running the following command in the `client` directory of the project:
 
```
$ cd client
$ npm install
```

7. Start the frontend server by running the following command in the `client` directory of the project: 

```
$ npm start
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

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
