# Express-Auth-Backend

Express-Auth-Backend is a web application built with Express.js and JavaScript
that provides authentication and authorization functionalities for web applications.
This project aims to offer a robust and secure backend for managing user authentication.

## Features

- **User Authentication:**: Secure user authentication using various strategies.
  - `JWT Authentication`: JSON Web Tokens for stateless authentication.
- **User Authorization:**: Role-based access control to manage user permissions.
  - `Admin Role`: Full access to all resources and functionalities.
  - `User Role`: Limited access based on user permissions.
- **Password Management:**: Secure password handling and management.
  - `Password Hashing`: Securely hash passwords using bcrypt.
  - `Password Reset`: Functionality to reset forgotten passwords.
- **Security Features:**: Enhance the security of the application.
  - `Input Validation`: Validate user inputs to prevent injection attacks.
  - `CORS`: Configure Cross-Origin Resource Sharing for secure API access.

## Technologies Used

- Express.js: Web application framework for Node.js.
- JSON Web Token (JWT): Standard for creating access tokens.
- bcrypt: Library for hashing passwords.
- MongoDB: NoSQL database for storing user data.
- Mongoose: ODM for MongoDB and Node.js.
- nodemailer: Module for Node.js applications to send emails.
- zod: TypeScript-first schema declaration and validation library.

## Installation

To set up and run this project locally,
you'll need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
Follow these steps:

1. Clone the repository: `git clone https://github.com/nureka-rodrigo/Express-Auth-Backend.git`
2. Navigate into the project directory: `cd Express-Auth-Backend`
3. Install the dependencies: `npm install`
4. Start the application: `npm start`

The application will start running on `http://localhost:3000/`.

## Environment Variables

The project uses the following environment variables, which are stored in a `.env` file:

- `PORT`: The port on which the server will run (e.g., 8000).
- `NODE_ENV`: The environment in which the application is running (e.g., development).
- `CLIENT_URL`: The URL of the client application (e.g., http://localhost:3000).
- `MONGODB_URI`: The URI for connecting to the MongoDB database.
- `JWT_SECRET`: The secret key for signing JWT tokens.
- `NODEMAILER_HOST`: The host for the Nodemailer service.
- `NODEMAILER_PORT`: The port for the Nodemailer service.
- `NODEMAILER_SECURE`: Whether to use a secure connection for Nodemailer.
- `NODEMAILER_USER`: The user for the Nodemailer service.
- `NODEMAILER_PASS`: The password for the Nodemailer service.
- `NODEMAILER_FROM`: The email address from which emails will be sent.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the terms of the [MIT license](https://github.com/nureka-rodrigo/Express-Auth-Backend/blob/main/LICENSE).