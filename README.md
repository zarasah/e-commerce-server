# E-Commerce Back-End

## Description

This project was built to help you start an e-commerce platform for a clothing store. It provides a boilerplate for creating an eCommerce backend with features like user registration and authentication, product management, cart management.

## Features

* User Authentication: Users can create an account, log in, and obtain authentication tokens for secure access to protected routes.
* Authorization: Role-based access control allows for different levels of access and permissions based on user roles (e.g., admin, regular user).
* Email Confirmation: An email confirmation process is implemented to verify user email addresses during the registration process.
* Product Management: CRUD operations are available for managing products, including creating, updating, retrieving, and deleting product information.
* Category Management: CRUD operations allow for the management of categories, including creating, updating, retrieving, and deleting category information.
* Cart Management
* CartItems Management
* User Management: Administrators can perform user management tasks, such as updating, retrieving, and deleting user accounts.
* MySQLdatabase with Sequelize ORM
* Seeding

## Technologies/libraries used

* Node.js
* Express.js
* nodemon
* MySQL
* Sequelize
* JSON Web Tokens (JWT)
* Bcrypt
* dotenv
* CORS
* Multer
* Nodemailer

### Installing

```
git clone https://github.com/zarasah/e-commerce-server.git
cd .. e-commerce-server
npm install
```

## Getting Started

To get started with the e-commerce back-end, please follow these steps:

### Prerequisites

Make sure you have the following software installed on your machine:

* Node.js: You can download it from the official website: https://nodejs.org
* MySQL: You can download the MySQL Community Server from the official website: https://www.mysql.com

### Configuration

* Create a new MySQL database for the application.
* Create the .env file to and create the following configuration variables in the .env file:
DB_USER: MySQL username
DB_PASSWORD: MySQL password
DB_DATABASE: MySQL database name

### Database Migration

The application uses Sequelize migrations to manage the database schema. To run the migrations, execute the following command:

```
npm run migrate
```

### Starting the Server

Start the server by running the following command:

```
npm run dev
```

The server will start running on http://localhost:4001/

## API Documentation
The following endpoints are available in the e-commerce back-end:

### Authentication

* "POST /register": This endpoint accepts a JSON payload containing the user's registration information, such as email and password. It is used to create a new user account in the system.
* "POST /login": User login endpoint. It accepts a JSON payload containing the email and password of the user and returns an authentication token if the login is successful.

### Products

* "GET /product": Get all products.
* "GET /product/:id": Get a specific product by ID.
* "POST /product/create": Create a new product. Requires authentication.
* "PUT /products/update?id=id": Update a specific product by ID. Requires authentication.
* "DELETE /product?id=id": Delete a specific product by ID. Requires authentication.

### Categories

* "GET /category": Get all categories.
* "GET /category/:id": Get a specific category by ID.
* "POST /category/create": Create a new category. Requires authentication.
* "PUT /category/update?id=id": Update a specific category by ID. Requires authentication.
* "DELETE /category?id=id": Delete a specific category by ID. Requires authentication.

Please note that for the endpoints that require authentication, you need to include the Authorization header in the request with the value of <token>, where <token> is the authentication token obtained during the login process.

